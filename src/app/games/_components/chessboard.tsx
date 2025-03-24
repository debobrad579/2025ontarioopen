"use client"

import { useEventListener } from "@/hooks/useEventListener"
import { cn, parseFEN } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import wP from "@/assets/img/chess-pieces/wP.svg"
import bP from "@/assets/img/chess-pieces/bP.svg"
import wR from "@/assets/img/chess-pieces/wR.svg"
import bR from "@/assets/img/chess-pieces/bR.svg"
import wN from "@/assets/img/chess-pieces/wN.svg"
import bN from "@/assets/img/chess-pieces/bN.svg"
import wB from "@/assets/img/chess-pieces/wB.svg"
import bB from "@/assets/img/chess-pieces/bB.svg"
import wQ from "@/assets/img/chess-pieces/wQ.svg"
import bQ from "@/assets/img/chess-pieces/bQ.svg"
import wK from "@/assets/img/chess-pieces/wK.svg"
import bK from "@/assets/img/chess-pieces/bK.svg"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pieceMap: { [key: string]: any } = {
  P: wP,
  R: wR,
  N: wN,
  B: wB,
  Q: wQ,
  K: wK,
  p: bP,
  r: bR,
  n: bN,
  b: bB,
  q: bQ,
  k: bK,
}

export function Chessboard({ fen }: { fen: string }) {
  const board = parseFEN(fen)
  const [highlightedSquareIndices, setHighlightedSquareIndices] = useState<
    number[]
  >([])
  const [startArrowIndex, setStartArrowIndex] = useState<number | undefined>()
  const [arrows, setArrows] = useState<
    { startIndex: number; endIndex: number }[]
  >([])
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const indexToCoords = (index: number) => {
    const x = (index % 8) * (width / 8) + width / 16
    const y = Math.floor(index / 8) * (width / 8) + width / 16
    return { x, y }
  }

  useEventListener("resize", () => {
    if (!ref.current) return
    setWidth(ref.current?.clientWidth)
  })

  useEffect(() => {
    if (!ref.current) return
    setWidth(ref.current?.clientWidth)
  }, [])

  return (
    <div
      ref={ref}
      className="aspect-square grid grid-cols-8 grid-rows-8 relative"
      onClick={() => {
        setArrows([])
        setHighlightedSquareIndices([])
      }}
    >
      {board.flat().map((piece, i) => (
        <Square
          key={i}
          index={i}
          boardWidth={width}
          piece={piece}
          highlighted={highlightedSquareIndices.includes(i)}
          onRightClick={() => setStartArrowIndex(i)}
          onRightRelease={() => {
            if (!startArrowIndex) return
            if (startArrowIndex === i) {
              if (highlightedSquareIndices.includes(i)) {
                setHighlightedSquareIndices((prevRightClickedSquares) =>
                  prevRightClickedSquares.toSpliced(
                    prevRightClickedSquares.indexOf(i),
                    1
                  )
                )
              } else {
                setHighlightedSquareIndices((prevRightClickedSquares) => [
                  ...prevRightClickedSquares,
                  i,
                ])
              }
              return
            }
            if (
              arrows
                .map((arrow) => `${arrow.startIndex}${arrow.endIndex}`)
                .includes(`${startArrowIndex}${i}`)
            ) {
              setArrows((prevArrows) =>
                prevArrows.toSpliced(
                  prevArrows
                    .map((arrow) => `${arrow.startIndex}${arrow.endIndex}`)
                    .indexOf(`${startArrowIndex}${i}`),
                  1
                )
              )
            } else {
              setArrows((prevArrows) => [
                ...prevArrows,
                { startIndex: startArrowIndex, endIndex: i },
              ])
            }
            setStartArrowIndex(undefined)
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {arrows.map(({ startIndex, endIndex }, i) => {
          const start = indexToCoords(startIndex)
          const end = indexToCoords(endIndex)
          const strokeWidth = width / 64
          const arrowSize = strokeWidth * 4
          const arrowOffset = arrowSize * 0.26
          const angle = Math.atan2(end.y - start.y, end.x - start.x)
          const dx = end.x - start.x
          const dy = end.y - start.y
          const length = Math.sqrt(dx * dx + dy * dy)
          const adjustedEndX = end.x - arrowOffset * Math.cos(angle)
          const adjustedEndY = end.y - arrowOffset * Math.sin(angle)

          return (
            <g key={i} opacity="0.8">
              <line
                x1={start.x + (dx / length) * (width / 48)}
                y1={start.y + (dy / length) * (width / 48)}
                x2={adjustedEndX - arrowSize * Math.cos(angle)}
                y2={adjustedEndY - arrowSize * Math.sin(angle)}
                strokeLinecap="square"
                stroke="#ffaa00"
                strokeWidth={strokeWidth}
              />
              <polygon
                points={`${adjustedEndX},${adjustedEndY}
            ${adjustedEndX - arrowSize * Math.cos(angle - Math.PI / 6)},
            ${adjustedEndY - arrowSize * Math.sin(angle - Math.PI / 6)} 
            ${adjustedEndX - arrowSize * Math.cos(angle + Math.PI / 6)},
            ${adjustedEndY - arrowSize * Math.sin(angle + Math.PI / 6)}`}
                fill="#ffaa00"
                stroke="#ffaa00"
                strokeWidth={strokeWidth}
                strokeLinejoin="miter"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Square({
  index,
  piece,
  highlighted,
  boardWidth,
  onRightClick,
  onRightRelease,
}: {
  index: number
  piece: string | null
  highlighted: boolean
  boardWidth: number
  onRightClick: () => void
  onRightRelease: () => void
}) {
  const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0
  const rank = 8 - Math.floor(index / 8)
  const file = String.fromCharCode(97 + (index % 8))
  const Piece = piece == null ? null : pieceMap[piece]

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick()
      }}
      onMouseUp={(e) => {
        if (e.button !== 2) return
        onRightRelease()
      }}
      className={cn(
        "w-full aspect-square relative leading-none",
        isLight
          ? highlighted
            ? "bg-[#ee7965] text-[#e46956]"
            : "bg-[#eed6b2] text-[#ba8765]"
          : highlighted
          ? "bg-[#e46956] text-[#ee7965]"
          : "bg-[#ba8765] text-[hsl(36,64%,82%)]"
      )}
    >
      {file === "a" && (
        <div
          className={"absolute top-[2px] left-[2px]"}
          style={{ fontSize: boardWidth / 40 }}
        >
          {rank}
        </div>
      )}
      {rank === 1 && (
        <div
          className={"absolute bottom-[2px] right-[2px]"}
          style={{ fontSize: boardWidth / 40 }}
        >
          {file}
        </div>
      )}
      {Piece != null && <Piece />}
    </div>
  )
}
