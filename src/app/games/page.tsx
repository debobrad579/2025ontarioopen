import { Metadata } from "next"
import { DGTBoard } from "./dgt-board"

export const metadata: Metadata = {
  title: "Games",
}

export default async function Games() {
  const game1Data = await fetch(
    "https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/round-1/game-1.json"
  ).then((res) => res.json())

  const moves = game1Data.moves.map((move: string) => move.split(" ")[0])
  const wTimestamps = game1Data.moves
    .filter((move: string, index: number) => index % 2 === 0)
    .map((move: string) => Number(move.split(" ")[1].split("+")[0]))
  const bTimestamps = game1Data.moves
    .filter((move: string, index: number) => index % 2 !== 0)
    .map((move: string) => Number(move.split(" ")[1].split("+")[0]))

  return (
    <div className="flex gap-4">
      <DGTBoard
        moves={moves}
        wTimestamps={wTimestamps}
        bTimestamps={bTimestamps}
      />
      <DGTBoard
        moves={moves}
        wTimestamps={wTimestamps}
        bTimestamps={bTimestamps}
        end
      />
    </div>
  )
}
