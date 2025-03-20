"use client"

import { useEffect, useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { formatSeconds } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

export function convertMovesToPgn(moves: string[]): string {
  let pgn = ""
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    if (i % 2 === 0) {
      pgn += `${Math.floor(i / 2) + 1}. ${move} `
    } else {
      pgn += `${move} `
    }
  }
  return pgn.trim()
}

export function DGTBoard({
  moves,
  wTimestamps,
  bTimestamps,
  end = false,
}: {
  moves: string[]
  wTimestamps: number[]
  bTimestamps: number[]
  end?: boolean
}) {
  const [game, setGame] = useState(new Chess())
  const [undoCount, setUndoCount] = useState(0)
  const [rightClickedSquares, setRightClickedSquares] = useState<{
    [squareId: string]: { backgroundColor: string } | undefined
  }>({})

  useEffect(() => {
    const gameCopy = { ...game }
    gameCopy.load_pgn(convertMovesToPgn(moves))
    setGame(gameCopy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves])

  const currentWTimestamp = wTimestamps.at(
    -Math.ceil((undoCount + 1 + Number(game.turn() === "w")) / 2)
  )
  const currentBTimestamp = bTimestamps.at(
    -Math.ceil((undoCount + 1 + Number(game.turn() === "b")) / 2)
  )

  // function makeAMove(move: string) {
  //   const gameCopy = { ...game }
  //   gameCopy.move(move)
  //   setGame(gameCopy)
  // }

  function undoMove() {
    const gameCopy = { ...game }
    gameCopy.undo()
    setGame(gameCopy)
    setUndoCount((prevCount) => prevCount + 1)
  }

  function redoMove() {
    const move = moves.at(-undoCount)
    if (!move) return
    const gameCopy = { ...game }
    gameCopy.move(move)
    setGame(gameCopy)
    setUndoCount((prevCount) => prevCount - 1)
  }

  return (
    <div className="w-full flex gap-2 relative">
      <div
        className={cn(
          "flex flex-col justify-around font-bold text-xl pb-10 absolute z-10 h-full",
          end ? "-right-24" : "-left-24"
        )}
      >
        <div>{formatSeconds(currentBTimestamp)}</div>
        <div>{formatSeconds(currentWTimestamp)}</div>
      </div>
      <div className="w-full space-y-2">
        <Chessboard
          position={game.fen()}
          arePiecesDraggable={false}
          onSquareRightClick={(square) => {
            setRightClickedSquares({
              ...rightClickedSquares,
              [square]:
                rightClickedSquares[square] &&
                rightClickedSquares[square].backgroundColor ===
                  "rgba(255, 0, 0, 0.4)"
                  ? undefined
                  : { backgroundColor: "rgba(255, 0, 0, 0.4)" },
            })
          }}
          onSquareClick={() => setRightClickedSquares({})}
          customSquareStyles={{
            ...rightClickedSquares,
          }}
        />
        <div className="flex gap-2">
          <Button
            className="w-full"
            onClick={undoMove}
            disabled={undoCount === moves.length}
          >
            <TriangleLeftIcon />
          </Button>
          <Button
            className="w-full"
            onClick={redoMove}
            disabled={undoCount === 0}
          >
            <TriangleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
