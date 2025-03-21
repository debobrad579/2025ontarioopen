"use client"

import { useEffect, useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { formatSeconds } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useEventListener } from "@/hooks/useEventListener"

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
  const [mouseOverBoard, setMouseOverBoard] = useState(false)

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (!mouseOverBoard) return
    if (e.key === "ArrowLeft") undoMove()
    if (e.key === "ArrowRight") redoMove()
    if (e.key === "ArrowUp") reset()
    if (e.key === "ArrowDown") loadPgn()
  })

  useEffect(() => {
    loadPgn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentWTimestamp = wTimestamps.at(
    -Math.ceil((undoCount + 1 + Number(game.turn() === "w")) / 2)
  )
  const currentBTimestamp = bTimestamps.at(
    -Math.ceil((undoCount + 1 + Number(game.turn() === "b")) / 2)
  )

  function reset() {
    const gameCopy = { ...game }
    gameCopy.reset()
    setGame(gameCopy)
    setUndoCount(moves.length)
  }

  function loadPgn() {
    const gameCopy = { ...game }
    gameCopy.load_pgn(convertMovesToPgn(moves))
    setGame(gameCopy)
    setUndoCount(0)
  }

  function undoMove() {
    if (undoCount === moves.length) return
    const gameCopy = { ...game }
    gameCopy.undo()
    setGame(gameCopy)
    setUndoCount((prevCount) => prevCount + 1)
  }

  function redoMove() {
    if (undoCount === 0) return
    const move = moves.at(-undoCount)
    if (!move) return
    const gameCopy = { ...game }
    gameCopy.move(move)
    setGame(gameCopy)
    setUndoCount((prevCount) => prevCount - 1)
  }

  return (
    <div
      className="flex-1 basis-0 flex relative"
      onMouseEnter={() => setMouseOverBoard(true)}
      onMouseLeave={() => setMouseOverBoard(false)}
    >
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
          animationDuration={0}
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
            onClick={reset}
            disabled={undoCount === moves.length}
          >
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            className="w-full"
            onClick={undoMove}
            disabled={undoCount === moves.length}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            className="w-full"
            onClick={redoMove}
            disabled={undoCount === 0}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            className="w-full"
            onClick={loadPgn}
            disabled={undoCount === 0}
          >
            <DoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
