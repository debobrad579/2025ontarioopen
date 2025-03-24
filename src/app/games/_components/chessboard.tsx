"use client"

import { useEventListener } from "@/hooks/useEventListener"
import { parseFEN } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { Arrow } from "./arrow"
import { Square } from "./square"

export function Chessboard({ fen }: { fen: string }) {
  const [highlightedSquares, setHighlightedSquares] = useState<
    { index: number; fen: string }[]
  >([])
  const [startArrowIndex, setStartArrowIndex] = useState<number | undefined>()
  const [arrows, setArrows] = useState<
    { startIndex: number; endIndex: number; fen: string }[]
  >([])
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const board = parseFEN(fen)

  useEventListener("resize", () => {
    if (!ref.current) return
    setWidth(ref.current?.clientWidth)
  })

  useEffect(() => {
    if (!ref.current) return
    setWidth(ref.current?.clientWidth)
  }, [])

  function addHighlightedSquare(i: number) {
    const highlightedIndices = highlightedSquares.map(
      (highlightedSquare) => highlightedSquare.index
    )

    if (highlightedIndices.includes(i)) {
      return setHighlightedSquares((prevHighlightedSquares) =>
        prevHighlightedSquares.toSpliced(highlightedIndices.indexOf(i), 1)
      )
    }

    setHighlightedSquares((prevRightClickedSquares) => [
      ...prevRightClickedSquares,
      { index: i, fen: fen },
    ])
  }

  function addArrow(i: number) {
    if (startArrowIndex == null) return

    const arrowKeys = arrows.map(
      (arrow) => `${arrow.startIndex}${arrow.endIndex}`
    )
    const arrowKey = `${startArrowIndex}${i}`

    if (arrowKeys.includes(arrowKey)) {
      return setArrows((prevArrows) =>
        prevArrows.toSpliced(arrowKeys.indexOf(arrowKey), 1)
      )
    }

    setArrows((prevArrows) => [
      ...prevArrows,
      { startIndex: startArrowIndex, endIndex: i, fen: fen },
    ])
  }

  return (
    <div
      ref={ref}
      className="aspect-square grid grid-cols-8 grid-rows-8 relative"
      onClick={() => {
        setArrows((prevArrows) =>
          prevArrows.filter((arrow) => arrow.fen !== fen)
        )
        setHighlightedSquares((prevHighlightedSquares) =>
          prevHighlightedSquares.filter(
            (highlightedSquare) => highlightedSquare.fen !== fen
          )
        )
      }}
    >
      {board.flat().map((piece, i) => (
        <Square
          key={i}
          index={i}
          squareWidth={width / 8}
          piece={piece}
          isHighlighted={highlightedSquares
            .filter((highlightedSquare) => highlightedSquare.fen === fen)
            .map((highlightedSquare) => highlightedSquare.index)
            .includes(i)}
          onRightClick={() => setStartArrowIndex(i)}
          onRightRelease={() => {
            if (startArrowIndex === i) addHighlightedSquare(i)
            else addArrow(i)
            setStartArrowIndex(undefined)
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {arrows
          .filter((arrow) => arrow.fen === fen)
          .map((arrow) => (
            <Arrow
              key={`${arrow.startIndex}${arrow.endIndex}`}
              squareWidth={width / 8}
              arrow={arrow}
            />
          ))}
      </svg>
    </div>
  )
}
