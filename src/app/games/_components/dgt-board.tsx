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
import { Game } from "../types"

export function DGTBoard({
  gameData: { white, black, moves, result, thinkTime },
}: {
  gameData: Game
}) {
  const [game, setGame] = useState(new Chess())
  const [undoCount, setUndoCount] = useState(0)
  const [tick, setTick] = useState(0)
  const mouseOverBoard = useRef(false)
  const tableScrollAreaRef = useRef<HTMLDivElement>(null)
  const listScrollAreaRef = useRef<HTMLDivElement>(null)
  const moveSoundRef = useRef<HTMLAudioElement>(null)
  const captureSoundRef = useRef<HTMLAudioElement>(null)
  const checkSoundRef = useRef<HTMLAudioElement>(null)
  const castleSoundRef = useRef<HTMLAudioElement>(null)
  const promoteSoundRef = useRef<HTMLAudioElement>(null)
  const userInteracted = useRef(false)

  useEffect(() => {
    const handleUserInteraction = () => {
      userInteracted.current = true
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("keydown", handleUserInteraction)
    }

    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("keydown", handleUserInteraction)

    return () => {
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("keydown", handleUserInteraction)
    }
  }, [])

  useEffect(() => {
    if (thinkTime == null || result !== "*") return

    const start = Date.now()

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      setTick(elapsed)
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thinkTime, result, moves.length])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves.length])

  useEffect(() => {
    const move = game.history().at(-1)

    console.log(move)

    if (
      !userInteracted.current ||
      !move ||
      !moveSoundRef.current ||
      !captureSoundRef.current ||
      !checkSoundRef.current ||
      !castleSoundRef.current ||
      !promoteSoundRef.current
    )
      return

    if (move.includes("x")) {
      captureSoundRef.current.currentTime = 0
      captureSoundRef.current.play()
    } else if (move.includes("+") || move.includes("#")) {
      checkSoundRef.current.currentTime = 0
      checkSoundRef.current.play()
    } else if (move.includes("-")) {
      castleSoundRef.current.currentTime = 0
      castleSoundRef.current.play()
    } else if (move.includes("=")) {
      promoteSoundRef.current.currentTime = 0
      promoteSoundRef.current.play()
    } else {
      moveSoundRef.current.currentTime = 0
      moveSoundRef.current.play()
    }
  }, [game.history().length])

  let currentWTimestamp =
    white.timestamps.at(
      -Math.ceil((undoCount + 1 + Number(game.turn() === "w")) / 2)
    ) ?? 5400
  let currentBTimestamp =
    black.timestamps.at(
      -Math.ceil((undoCount + 1 + Number(game.turn() === "b")) / 2)
    ) ?? 5400

  if (undoCount === 0 && result === "*") {
    const optimisticThinkTime = Math.max(0, (thinkTime ?? 0) + tick)
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
      <audio ref={moveSoundRef} src={"/move.mp3"} />
      <audio ref={captureSoundRef} src={"/capture.mp3"} />
      <audio ref={checkSoundRef} src={"/check.mp3"} />
      <audio ref={castleSoundRef} src={"/castle.mp3"} />
      <audio ref={promoteSoundRef} src={"/promote.mp3"} />
      <div
        className="flex flex-col @lg:flex-row gap-2"
        onMouseEnter={() => (mouseOverBoard.current = true)}
        onMouseLeave={() => (mouseOverBoard.current = false)}
      >
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex justify-between w-full p-2 bg-gray-800 text-white font-bold leading-none">
              <div>
                {black.title && `${black.title} `}
                {black.name}
                <span className="font-normal pl-1">{black.elo}</span>
              </div>
              <div
                className={
                  undoCount !== 0
                    ? undefined
                    : result === "0-1"
                    ? "text-green-500"
                    : result === "1-0"
                    ? "text-red-500"
                    : result === "*" && game.turn() === "b"
                    ? "text-orange-500"
                    : undefined
                }
              >
                {undoCount !== 0 || result === "*"
                  ? formatSeconds(currentBTimestamp)
                  : result === "0-1"
                  ? 1
                  : result === "1-0"
                  ? 0
                  : "1/2"}
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
                {white.title && `${white.title} `}
                {white.name}{" "}
                <span className="font-normal pl-1">{white.elo}</span>
              </div>
              <div
                className={
                  undoCount !== 0
                    ? undefined
                    : result === "1-0"
                    ? "text-green-500"
                    : result === "0-1"
                    ? "text-red-500"
                    : result === "*" && game.turn() === "w"
                    ? "text-orange-500"
                    : undefined
                }
              >
                {undoCount !== 0 || result === "*"
                  ? formatSeconds(currentWTimestamp)
                  : result === "1-0"
                  ? 1
                  : result === "0-1"
                  ? 0
                  : "1/2"}
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
          className="w-[10.5rem] pr-1 aspect-video hidden @lg:block"
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
