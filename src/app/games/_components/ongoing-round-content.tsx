"use client"

import { useEffect, useState } from "react"
import { parsePGN } from "@/lib/parsers"
import type { Game, RoundData } from "../types"
import { DGTBoard } from "./dgt-board"

export function OngoingRoundContent({ roundId }: { roundId: string }) {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    let controller: AbortController | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let stopped = false

    async function fetchInitialPGN() {
      const initialPGN = await fetch(
        `https://lichess.org/api/broadcast/round/${roundId}.pgn`
      ).then((res) => res.text())

      const initialGames = initialPGN
        .split("\n\n\n")
        .filter((gamePGN) => gamePGN !== "")
        .map((gamePGN) => parsePGN(gamePGN))

      const roundData: RoundData = await fetch(
        `https://lichess.org/api/broadcast/-/-/${roundId}`
      ).then((res) => res.json())

      setGames(
        initialGames.map((game, i) => ({
          ...game,
          thinkTime: roundData.games[i].thinkTime,
        }))
      )
    }

    async function streamPGN() {
      controller = new AbortController()

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_LICHESS_STREAM_API}/${roundId}`,
          {
            signal: controller.signal,
          }
        )

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        while (!stopped) {
          const { value, done } = await reader!.read()
          if (done) throw new Error("Stream closed")

          buffer += decoder.decode(value, { stream: true })

          const gamePGNs = buffer.split("\n\n\n")
          buffer = gamePGNs.pop() || ""

          for (const gamePGN of gamePGNs) {
            const newGame = parsePGN(gamePGN)
            setGames((prevGames) =>
              prevGames.map((game) =>
                game.wName === newGame.wName && game.bName === newGame.bName
                  ? {
                      ...newGame,
                      thinkTime: game.thinkTime !== 0 ? 0 : game.thinkTime,
                    }
                  : game
              )
            )
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("PGN stream aborted (cleanup)")
        } else {
          console.error("Stream error, reconnecting in 3s:", err)

          if (!stopped) {
            reconnectTimeout = setTimeout(() => {
              console.log("Reconnecting to PGN stream...")
              streamPGN() // try again
            }, 3000)
          }
        }
      }
    }

    fetchInitialPGN()
    streamPGN()

    return () => {
      console.log("Cleaning up PGN stream...")
      stopped = true
      controller?.abort()
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
    }
  }, [roundId])

  return games.length === 0
    ? [0, 1, 2, 3, 4, 5].map((i) => (
        <DGTBoard
          key={i}
          moves={[]}
          wTimestamps={[]}
          bTimestamps={[]}
          wName=""
          bName=""
          wTitle=""
          bTitle=""
          wElo=""
          bElo=""
          result=""
        />
      ))
    : games.map((game) => (
        <DGTBoard
          key={game.wName + game.bName}
          moves={game.moves}
          wTimestamps={game.wTimestamps}
          bTimestamps={game.bTimestamps}
          wName={game.wName}
          bName={game.bName}
          wTitle={game.wTitle}
          bTitle={game.bTitle}
          wElo={game.wElo}
          bElo={game.bElo}
          result={game.result}
          thinkTime={game.thinkTime}
        />
      ))
}
