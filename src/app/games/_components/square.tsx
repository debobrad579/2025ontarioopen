"use client"

import { cn } from "@/lib/utils"
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

export function Square({
  index,
  piece,
  isHighlighted,
  squareWidth,
  onRightClick,
  onRightRelease,
}: {
  index: number
  piece: string | null
  isHighlighted: boolean
  squareWidth: number
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
          ? isHighlighted
            ? "bg-[#ee7965] text-[#e46956]"
            : "bg-[#eed6b2] text-[#ba8765]"
          : isHighlighted
          ? "bg-[#e46956] text-[#ee7965]"
          : "bg-[#ba8765] text-[hsl(36,64%,82%)]"
      )}
    >
      {file === "a" && (
        <div
          className={"absolute top-[2px] left-[2px]"}
          style={{ fontSize: squareWidth / 5 }}
        >
          {rank}
        </div>
      )}
      {rank === 1 && (
        <div
          className={"absolute bottom-[2px] right-[2px]"}
          style={{ fontSize: squareWidth / 5 }}
        >
          {file}
        </div>
      )}
      {Piece != null && <Piece />}
    </div>
  )
}
