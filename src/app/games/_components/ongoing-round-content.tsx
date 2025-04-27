"use client"

import { useEffect, useState } from "react"
import { parsePGN } from "@/lib/parsers"
import { Game, RoundData } from "../types"
import { DGTBoard } from "./dgt-board"

export function OngoingRoundContent({
  roundId,
  defaultGames = [],
}: {
  roundId: string
  defaultGames?: Game[]
}) {
  const [games, setGames] = useState<Game[]>(defaultGames)

  useEffect(() => {
    const controller = new AbortController()

    async function streamPGN() {
      try {
        const res = await fetch(`http://localhost:5000/${roundId}`, {
          signal: controller.signal,
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        while (true) {
          const { value, done } = await reader!.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          const gamePGNs = buffer.split("\n\n\n")
          buffer = gamePGNs.pop() || ""

          for (const gamePGN of gamePGNs) {
            const newGame = parsePGN(gamePGN)
            setGames((prevGames) => {
              return prevGames.map((game) =>
                game.wName === newGame.wName && game.bName === newGame.bName
                  ? {
                      ...newGame,
                      thinkTime: game.thinkTime !== 0 ? 0 : game.thinkTime,
                    }
                  : game
              )
            })
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("PGN stream aborted (cleanup)")
        } else {
          console.error("Stream error:", err)
        }
      }
    }

    streamPGN()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId])

  return games.map((game) => (
    <DGTBoard
      key={game.wName + game.bName}
      moves={game.moves}
      wTimestamps={game.wTimestamps}
      bTimestamps={game.bTimestamps}
      wName={game.wName}
      bName={game.bName}
      wTitle={game.wTitle}
      bTitle={game.bTitle}
      result={game.result}
      thinkTime={game.thinkTime}
    />
  ))
}
