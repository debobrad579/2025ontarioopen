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
import { cn, convertMovesToPgn, getMoveNumberArrays } from "@/lib/utils"
import { geistMono } from "@/assets/fonts/fonts"
import { MoveCell } from "./move-cell"
import { Chessboard } from "./chessboard"

export function DGTBoard({
  moves,
  wTimestamps,
  bTimestamps,
  wName,
  bName,
  result,
}: {
  moves: string[]
  wTimestamps: number[]
  bTimestamps: number[]
  wName: string
  bName: string
  result: string
}) {
  const [game, setGame] = useState(new Chess())
  const [undoCount, setUndoCount] = useState(0)
  const mouseOverBoard = useRef(false)
  const tableScrollAreaRef = useRef<HTMLDivElement>(null)
  const listScrollAreaRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="@container">
      <div
        className="flex flex-col @lg:flex-row gap-2"
        onMouseEnter={() => (mouseOverBoard.current = true)}
        onMouseLeave={() => (mouseOverBoard.current = false)}
      >
        <div className="flex flex-col justify-center font-bold text-right @lg:w-[20ch] break-words">
          <div className="flex @lg:flex-col justify-between w-full p-2 bg-black text-white border-2 border-black">
            <div>{bName}</div>
            <div>{formatSeconds(currentBTimestamp)}</div>
          </div>
          <div className="flex @lg:flex-col-reverse justify-between w-full p-2 bg-white text-black border-2 border-black">
            <div>{wName}</div>
            <div>{formatSeconds(currentWTimestamp)}</div>
          </div>
        </div>
        <div className="flex-1 min-w-64 space-y-2">
          <Chessboard fen={game.fen()} />
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
        <ScrollArea ref={listScrollAreaRef} className="@lg:hidden w-full pb-2">
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
