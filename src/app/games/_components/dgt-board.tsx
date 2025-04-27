"use client"

import { useEffect, useRef, useState } from "react"
import { Chess } from "chess.js"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEventListener } from "@/hooks/useEventListener"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { formatSeconds } from "@/lib/formatters"
import { cn } from "@/lib/utils"
import { geistMono } from "@/assets/fonts/fonts"
import { MoveCell } from "./move-cell"
import { Chessboard } from "./chessboard"

export function DGTBoard({
  moves,
  wTimestamps,
  bTimestamps,
  wName,
  bName,
  wTitle,
  bTitle,
  wElo,
  bElo,
  result,
  thinkTime,
}: {
  moves: string[]
  wTimestamps: number[]
  bTimestamps: number[]
  wName: string
  bName: string
  wTitle: string
  bTitle: string
  wElo: string
  bElo: string
  result: string
  thinkTime?: number
}) {
  const [game, setGame] = useState(new Chess())
  const [undoCount, setUndoCount] = useState(0)
  const mouseOverBoard = useRef(false)
  const tableScrollAreaRef = useRef<HTMLDivElement>(null)
  const listScrollAreaRef = useRef<HTMLDivElement>(null)
  const [optimisticThinkTime, setOptimisticThinkTime] = useState(thinkTime ?? 0)

  useEffect(() => {
    if (thinkTime == null) return

    const interval = setInterval(() => {
      setOptimisticThinkTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thinkTime])

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (!mouseOverBoard.current) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      undoMove()
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      redoMove()
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      reset()
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      loadPgn()
      setUndoCount(0)
    }
  })

  useEffect(() => {
    loadPgn()
    setUndoCount(0)
    setOptimisticThinkTime(thinkTime ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves.length])

  let currentWTimestamp =
    wTimestamps.at(
      -Math.ceil((undoCount + 1 + Number(game.turn() === "w")) / 2)
    ) ?? 5400
  let currentBTimestamp =
    bTimestamps.at(
      -Math.ceil((undoCount + 1 + Number(game.turn() === "b")) / 2)
    ) ?? 5400

  if (undoCount === 0) {
    if (game.turn() === "w") {
      currentWTimestamp -= optimisticThinkTime
    } else {
      currentBTimestamp -= optimisticThinkTime
    }
  }

  function reset() {
    const gameCopy = { ...game }
    gameCopy.reset()
    setGame(gameCopy)
    setUndoCount(moves.length)
  }

  function loadPgn(movesArr: string[] | undefined = moves) {
    const gameCopy = { ...game }
    gameCopy.load_pgn(convertMovesToPgn(movesArr))
    setGame(gameCopy)
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

  const previousMove = game.history({ verbose: true }).at(-1)

  return (
    <div className="@container">
      <div
        className="flex flex-col @lg:flex-row gap-2"
        onMouseEnter={() => (mouseOverBoard.current = true)}
        onMouseLeave={() => (mouseOverBoard.current = false)}
      >
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex justify-between w-full p-2 bg-gray-800 text-white font-bold leading-none">
              <div>
                {bTitle && `${bTitle} `}
                {bName} <span className="font-normal pl-1">{bElo}</span>
              </div>
              <div
                className={
                  result === "*" && game.turn() === "b" && undoCount === 0
                    ? "text-orange-500"
                    : undefined
                }
              >
                {formatSeconds(currentBTimestamp)}
              </div>
            </div>
            <Chessboard
              fen={game.fen()}
              previousMove={
                previousMove
                  ? { from: previousMove.from, to: previousMove.to }
                  : undefined
              }
              check={game.in_check() ? game.turn() : undefined}
            />
            <div className="flex justify-between w-full p-2 bg-gray-200 text-black font-bold leading-none">
              <div>
                {wTitle && `${wTitle} `}
                {wName} <span className="font-normal pl-1">{wElo}</span>
              </div>
              <div
                className={
                  result === "*" && game.turn() === "w" && undoCount === 0
                    ? "text-orange-500"
                    : undefined
                }
              >
                {formatSeconds(currentWTimestamp)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full"
              onClick={reset}
              disabled={undoCount === moves.length}
            >
              <ChevronFirst />
            </Button>
            <Button
              className="w-full"
              onClick={undoMove}
              disabled={undoCount === moves.length}
            >
              <ChevronLeft />
            </Button>
            <Button
              className="w-full"
              onClick={redoMove}
              disabled={undoCount === 0}
            >
              <ChevronRight />
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                loadPgn()
                setUndoCount(0)
              }}
              disabled={undoCount === 0}
            >
              <ChevronLast />
            </Button>
          </div>
        </div>
        <ScrollArea
          ref={tableScrollAreaRef}
          className="min-w-[10.5rem] max-w-[10.5rem] pr-1 aspect-video hidden @lg:block"
        >
          <Table className={geistMono.className}>
            <TableHeader>
              <TableRow className="text-muted-foreground">
                <MoveCell
                  active={undoCount === moves.length}
                  undoCount={undoCount}
                  scrollAreaRef={tableScrollAreaRef}
                  isTableCell
                  noStyles
                >
                  No.
                </MoveCell>
                <TableCell>White</TableCell>
                <TableCell>Black</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getMoveNumberArrays(moves).map((moveSet, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}.</TableCell>
                  <MoveCell
                    onClick={() => {
                      loadPgn(moves.slice(0, index * 2 + 1))
                      setUndoCount(moves.length - index * 2 - 1)
                    }}
                    active={undoCount === moves.length - index * 2 - 1}
                    undoCount={undoCount}
                    scrollAreaRef={tableScrollAreaRef}
                    isTableCell
                  >
                    {moveSet[0]}
                  </MoveCell>
                  <MoveCell
                    onClick={() => {
                      loadPgn(moves.slice(0, index * 2 + 2))
                      setUndoCount(moves.length - index * 2 - 2)
                    }}
                    active={undoCount === moves.length - index * 2 - 2}
                    undoCount={undoCount}
                    scrollAreaRef={tableScrollAreaRef}
                    isTableCell
                  >
                    {moveSet[1]}
                  </MoveCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold text-right">
                  {result.split("-")[0]}
                </TableCell>
                <TableCell className="font-bold text-center">-</TableCell>
                <TableCell className="font-bold">
                  {result.split("-")[1]}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
        <ScrollArea
          ref={listScrollAreaRef}
          className="@lg:hidden w-full pb-2 text-nowrap"
        >
          <MoveCell
            active={undoCount === moves.length}
            undoCount={undoCount}
            scrollAreaRef={listScrollAreaRef}
            noStyles
          />
          <div className={cn("flex gap-4 w-full", geistMono.className)}>
            {getMoveNumberArrays(moves).map((moveSet, index) => (
              <div key={index} className="flex gap-2">
                <div>{index + 1}.</div>
                <MoveCell
                  onClick={() => {
                    loadPgn(moves.slice(0, index * 2 + 1))
                    setUndoCount(moves.length - index * 2 - 1)
                  }}
                  active={undoCount === moves.length - index * 2 - 1}
                  undoCount={undoCount}
                  scrollAreaRef={listScrollAreaRef}
                >
                  {moveSet[0]}
                </MoveCell>
                <MoveCell
                  onClick={() => {
                    loadPgn(moves.slice(0, index * 2 + 2))
                    setUndoCount(moves.length - index * 2 - 2)
                  }}
                  active={undoCount === moves.length - index * 2 - 2}
                  undoCount={undoCount}
                  scrollAreaRef={listScrollAreaRef}
                >
                  {moveSet[1]}
                </MoveCell>
              </div>
            ))}
            <div className="font-bold whitespace-nowrap">
              {result.replace("-", " - ")}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

function convertMovesToPgn(moves: string[]): string {
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

function getMoveNumberArrays(arr: string[]): [string, string][] {
  if (arr.length === 0) {
    return []
  }

  const moveSet: [string, string] = [arr[0] || "", arr[1] || ""]

  return [moveSet, ...getMoveNumberArrays(arr.slice(2))]
}
