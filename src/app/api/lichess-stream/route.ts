import type { NextRequest } from "next/server"

const broadcasts = new Map<
  string,
  Promise<{
    upstream: ReadableStreamDefaultReader<Uint8Array>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clients: Set<ReadableStreamDefaultController<any>>
    abortController: AbortController
  }>
>()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const broadcastRoundId = searchParams.get("broadcastRoundId")

  if (!broadcastRoundId) {
    return new Response("Missing broadcastRoundId", { status: 400 })
  }

  let broadcastPromise = broadcasts.get(broadcastRoundId)

  if (!broadcastPromise) {
    console.log(`Starting new upstream for round: ${broadcastRoundId}`)

    broadcastPromise = (async () => {
      const abortController = new AbortController()

      const upstreamRes = await fetch(
        `https://lichess.org/api/stream/broadcast/round/${broadcastRoundId}.pgn`,
        {
          headers: {
            Accept: "application/x-ndjson",
          },
          signal: abortController.signal,
        }
      )

      if (!upstreamRes.ok) {
        throw new Error(
          `Upstream Lichess error: ${upstreamRes.status} ${upstreamRes.statusText}`
        )
      }

      const reader = upstreamRes.body!.getReader()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clients = new Set<ReadableStreamDefaultController<any>>()
      const decoder = new TextDecoder()

      ;(async () => {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = decoder.decode(value, { stream: true })

            for (const client of clients) {
              try {
                client.enqueue(text)
              } catch (err) {
                console.error("Failed to push to client:", err)
              }
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err.name !== "AbortError") console.error("Upstream error:", err)

          for (const client of clients) {
            try {
              client.error(err)
            } catch {}
          }
        } finally {
          console.log(`Upstream closed for round ${broadcastRoundId}`)
          broadcasts.delete(broadcastRoundId)
          for (const client of clients) {
            try {
              client.close()
            } catch {}
          }
        }
      })()

      return { upstream: reader, clients, abortController }
    })()

    broadcasts.set(broadcastRoundId, broadcastPromise)
  }

  const broadcast = await broadcastPromise

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let thisController: ReadableStreamDefaultController<any>

  const stream = new ReadableStream({
    start(controller) {
      thisController = controller
      broadcast.clients.add(controller)

      controller.enqueue(`: connected to round ${broadcastRoundId}\n\n`)

      console.log(
        `Client connected to round ${broadcastRoundId}. Total clients: ${broadcast.clients.size}`
      )
    },
    cancel() {
      broadcast.clients.delete(thisController)
      console.log(
        `Client disconnected from round ${broadcastRoundId}. Remaining clients: ${broadcast.clients.size}`
      )

      if (broadcast.clients.size === 0) {
        console.log(
          `No clients left. Aborting upstream for round ${broadcastRoundId}`
        )
        broadcast.abortController.abort()
        broadcasts.delete(broadcastRoundId)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
