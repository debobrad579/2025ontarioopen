import { Metadata } from "next"
import { DGTBoard } from "./dgt-board"
import type { GameJson, IndexJson, TournamentJson } from "./types"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RoundTabsList } from "./round-tabs-list"

export const metadata: Metadata = {
  title: "Games",
}

type BoardData = {
  moves: string[]
  wTimestamps: number[]
  bTimestamps: number[]
  wName: string
  bName: string
  result: string
  round: number
  game: number
}

export default async function Games() {
  const tournamentData: TournamentJson = await fetch(
    "https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/tournament.json"
  ).then((res) => res.json())
  const boardData: BoardData[] = []
  for (let i = 0; i < tournamentData.rounds.length; i++) {
    const indexData: IndexJson = await fetch(
      `https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/round-${
        i + 1
      }/index.json`
    ).then((res) => res.json())
    for (let j = 0; j < tournamentData.rounds[i].count; j++) {
      const gameData: GameJson = await fetch(
        `https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/round-${
          i + 1
        }/game-${j + 1}.json`
      ).then((res) => res.json())
      const pairing = indexData.pairings[j]
      boardData.push({
        moves: gameData.moves.map((move: string) => move.split(" ")[0]),
        wTimestamps: gameData.moves
          .filter((move: string, index: number) => index % 2 === 0)
          .map((move: string) => Number(move.split(" ")[1].split("+")[0])),
        bTimestamps: gameData.moves
          .filter((move: string, index: number) => index % 2 !== 0)
          .map((move: string) => Number(move.split(" ")[1].split("+")[0])),
        wName: `${pairing.white.fname} ${pairing.white.lname ?? ""}`.trim(),
        bName: `${pairing.black.fname} ${pairing.black.lname ?? ""}`.trim(),
        result: pairing.result,
        round: i + 1,
        game: j + 1,
      })
    }
  }

  return (
    <Tabs defaultValue="r1" className="pb-4">
      <RoundTabsList />
      <TabsRound round={1} boardData={boardData} />
      <TabsRound round={2} boardData={boardData} />
      <TabsRound round={3} boardData={boardData} />
      <TabsRound round={4} boardData={boardData} />
      <TabsRound round={5} boardData={boardData} />
      <TabsRound round={6} boardData={boardData} />
    </Tabs>
  )
}

function TabsRound({
  round,
  boardData,
}: {
  round: number
  boardData: BoardData[]
}) {
  return (
    <TabsContent value={`r${round}`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {boardData
          .filter((data) => data.round === round)
          .map((data) => (
            <DGTBoard key={`r${data.round}g${data.game}`} {...data} />
          ))}
      </div>
    </TabsContent>
  )
}
