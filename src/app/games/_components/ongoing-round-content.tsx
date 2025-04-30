"use client"

import { useEffect, useRef, useState } from "react"
import { parsePGN } from "@/lib/parsers"
import type { Game, RoundData } from "../types"
import { DGTBoard } from "./dgt-board"
import { SkeletonDGTBoard } from "./skeleton-dgt-board"

export function OngoingRoundContent({ roundId }: { roundId: string }) {
  const [games, setGames] = useState<Game[]>([])
  const moveSoundRef = useRef<HTMLAudioElement>(null)
  const captureSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let socket: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let manuallyClosed = false

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
          thinkTime: roundData.games[i]?.thinkTime || 0,
        }))
      )
    }

    function connectWebSocket() {
      socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_LICHESS_STREAM_API_WS}/${roundId}`
      )

      socket.addEventListener("open", () => {
        console.log("WebSocket connected")
      })

      socket.addEventListener("message", (event) => {
        const gamePGNs = event.data
          .split("\n\n\n")
          .filter((pgn: string) => pgn !== "")
        for (const gamePGN of gamePGNs) {
          const newGame = parsePGN(gamePGN)

          if (newGame.moves.at(-1)?.includes("x") && captureSoundRef.current) {
            captureSoundRef.current.currentTime = 0
            captureSoundRef.current.play()
          } else if (moveSoundRef.current) {
            moveSoundRef.current.currentTime = 0
            moveSoundRef.current.play()
          }

          setGames((prevGames) => {
            return prevGames.map((game) =>
              game.white.name === newGame.white.name &&
              game.black.name === newGame.black.name
                ? {
                    ...newGame,
                    thinkTime: game.thinkTime !== 0 ? 0 : game.thinkTime,
                  }
                : game
            )
          })
        }
      })

      socket.addEventListener("close", () => {
        console.log("WebSocket closed")
        if (!manuallyClosed) {
          console.log("Reconnecting in 5 seconds...")
          reconnectTimeout = setTimeout(() => {
            fetchInitialPGN()
            connectWebSocket()
          }, 5000)
        }
      })

      socket.addEventListener("error", () => {
        socket?.close()
      })
    }

    fetchInitialPGN()
    connectWebSocket()

    return () => {
      manuallyClosed = true
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      socket?.close()
    }
  }, [roundId])

  return games.length === 0 ? (
    Array.from({ length: 6 }).map((_, i) => <SkeletonDGTBoard key={i} />)
  ) : (
    <>
      <audio ref={moveSoundRef} src={"/move.mp3"} preload="auto" />
      <audio ref={captureSoundRef} src={"/capture.mp3"} preload="auto" />
      {games.map((game) => (
        <DGTBoard key={game.white.name + game.black.name} gameData={game} />
      ))}
    </>
  )
}
