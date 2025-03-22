"use client"

import {
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
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
import { useEventListener } from "@/hooks/useEventListener"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { geistMono } from "@/assets/fonts/fonts"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
  const [rightClickedSquares, setRightClickedSquares] = useState<{
    [squareId: string]: { backgroundColor: string } | undefined
  }>({})
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

  function moveNumbersArray(arr: string[]): [string, string][] {
    if (arr.length === 0) {
      return []
    }

    const chunk: [string, string] = [arr[0] || "", arr[1] || ""]

    return [chunk, ...moveNumbersArray(arr.slice(2))]
  }

  return (
    <div className="@container">
      <div
        className="flex flex-col @lg:flex-row gap-2"
        onMouseEnter={() => (mouseOverBoard.current = true)}
        onMouseLeave={() => (mouseOverBoard.current = false)}
      >
        <div className="flex flex-col justify-center font-bold text-right @lg:w-[20ch] break-words">
          <div className="flex @lg:flex-col justify-between w-full p-2 bg-black text-white">
            <div>{bName}</div>
            <div>{formatSeconds(currentBTimestamp)}</div>
          </div>
          <div className="flex @lg:flex-col-reverse justify-between w-full p-[calc(0.5rem-2px)] bg-white text-black border-2 border-black">
            <div>{wName}</div>
            <div>{formatSeconds(currentWTimestamp)}</div>
          </div>
        </div>
        <div className="flex-1 min-w-64 space-y-2">
          <div className="aspect-square bg-[#f1d9b7] animate-chess-pulse">
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
          </div>
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
              onClick={() => {
                loadPgn()
                setUndoCount(0)
              }}
              disabled={undoCount === 0}
            >
              <DoubleArrowRightIcon />
            </Button>
          </div>
        </div>
        <ScrollArea
          ref={tableScrollAreaRef}
          className="min-w-[10.5rem] max-w-[10.5rem] pr-1 aspect-video hidden @lg:block"
        >
          <Table className={geistMono.className}>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>White</TableHead>
                <TableHead>Black</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moveNumbersArray(moves).map((moveSet, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableMoveCell
                    onClick={() => {
                      loadPgn(moves.slice(0, index * 2 + 1))
                      setUndoCount(moves.length - index * 2 - 1)
                    }}
                    className={cn(
                      "cursor-pointer",
                      undoCount === moves.length - index * 2 - 1 && "font-bold"
                    )}
                    scrollPredicate={
                      undoCount === moves.length - index * 2 - 1 ||
                      (undoCount === moves.length && index === 0)
                    }
                    undoCount={undoCount}
                    scrollAreaRef={tableScrollAreaRef}
                  >
                    {moveSet[0]}
                  </TableMoveCell>
                  <TableMoveCell
                    onClick={() => {
                      loadPgn(moves.slice(0, index * 2 + 2))
                      setUndoCount(moves.length - index * 2 - 2)
                    }}
                    className={cn(
                      "cursor-pointer",
                      undoCount === moves.length - index * 2 - 2 && "font-bold"
                    )}
                    scrollPredicate={undoCount === moves.length - index * 2 - 2}
                    undoCount={undoCount}
                    scrollAreaRef={tableScrollAreaRef}
                  >
                    {moveSet[1]}
                  </TableMoveCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold text-right">
                  {result.split("-")[0]}
                </TableCell>
                <TableCell className="font-bold text-center">-</TableCell>
                <TableCell className="font-bold">
                  {result.split("-")[1]}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
        <ScrollArea ref={listScrollAreaRef} className="@lg:hidden w-full pb-2">
          <ListMoveCell
            onClick={() => {}}
            className={""}
            scrollPredicate={undoCount === moves.length}
            undoCount={undoCount}
            scrollAreaRef={listScrollAreaRef}
          >
            {""}
          </ListMoveCell>
          <div className="flex gap-4 w-full">
            {moveNumbersArray(moves).map((moveSet, index) => (
              <div key={index} className="flex gap-2">
                <div>{index + 1}.</div>
                <ListMoveCell
                  onClick={() => {
                    loadPgn(moves.slice(0, index * 2 + 1))
                    setUndoCount(moves.length - index * 2 - 1)
                  }}
                  className={cn(
                    "cursor-pointer",
                    undoCount === moves.length - index * 2 - 1 && "font-bold"
                  )}
                  scrollPredicate={undoCount === moves.length - index * 2 - 1}
                  undoCount={undoCount}
                  scrollAreaRef={listScrollAreaRef}
                >
                  {moveSet[0]}
                </ListMoveCell>
                <ListMoveCell
                  onClick={() => {
                    loadPgn(moves.slice(0, index * 2 + 2))
                    setUndoCount(moves.length - index * 2 - 2)
                  }}
                  className={cn(
                    "cursor-pointer",
                    undoCount === moves.length - index * 2 - 2 && "font-bold"
                  )}
                  scrollPredicate={undoCount === moves.length - index * 2 - 2}
                  undoCount={undoCount}
                  scrollAreaRef={listScrollAreaRef}
                >
                  {moveSet[1]}
                </ListMoveCell>
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

function TableMoveCell({
  className,
  scrollPredicate,
  onClick,
  undoCount,
  scrollAreaRef,
  children,
}: {
  className: string
  scrollPredicate: boolean
  scrollAreaRef: RefObject<HTMLDivElement>
  onClick: MouseEventHandler<HTMLTableCellElement>
  undoCount: number
  children: ReactNode
}) {
  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (!scrollPredicate || !scrollAreaRef.current || !ref.current) return
    const viewport = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    )
    if (!viewport) return
    const itemTop = ref.current.offsetTop
    const itemBottom = itemTop + ref.current.offsetHeight
    const viewportTop = viewport.scrollTop
    const viewportBottom = viewportTop + viewport.clientHeight

    if (itemTop >= viewportTop && itemBottom <= viewportBottom) return
    viewport.scrollTo({
      top: itemTop,
      behavior: "smooth",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoCount])

  return (
    <TableCell ref={ref} onClick={onClick} className={className}>
      {children}
    </TableCell>
  )
}

function ListMoveCell({
  className,
  scrollPredicate,
  onClick,
  undoCount,
  scrollAreaRef,
  children,
}: {
  className: string
  scrollPredicate: boolean
  scrollAreaRef: RefObject<HTMLDivElement>
  onClick: MouseEventHandler<HTMLTableCellElement>
  undoCount: number
  children: ReactNode
}) {
  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (!scrollPredicate || !scrollAreaRef.current || !ref.current) return
    const viewport = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    )
    if (!viewport) return
    const itemLeft = ref.current.offsetLeft
    const itemRight = itemLeft + ref.current.offsetWidth
    const viewportLeft = viewport.scrollLeft
    const viewportRight = viewportLeft + viewport.clientWidth

    if (itemLeft >= viewportLeft && itemRight <= viewportRight) return
    viewport.scrollTo({
      left: itemLeft,
      behavior: "smooth",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoCount])

  return (
    <div ref={ref} onClick={onClick} className={className}>
      {children}
    </div>
  )
}
