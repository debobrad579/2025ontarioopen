import { Metadata } from "next"
import { DGTBoard } from "./_components/dgt-board"
import type { GameJson, IndexJson, Round, TournamentJson } from "./types"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RoundTabsList } from "./_components/round-tabs-list"

export const metadata: Metadata = {
  title: "Games",
}

export default async function Games() {
  const rounds: Round[] = []

  const tournamentData: TournamentJson = await fetch(
    "https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/tournament.json"
  ).then((res) => res.json())

  for (let i = 0; i < tournamentData.rounds.length; i++) {
    const indexData: IndexJson = await fetch(
      `https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/round-${
        i + 1
      }/index.json`
    ).then((res) => res.json())

    const round: Round = { index: i, games: [] }

    for (let j = 0; j < tournamentData.rounds[i].count; j++) {
      const gameData: GameJson = await fetch(
        `https://1.pool.livechesscloud.com/get/eb1275c0-8a83-4980-925f-3a1286a286a0/round-${
          i + 1
        }/game-${j + 1}.json`
      ).then((res) => res.json())

      const pairing = indexData.pairings[j]

      round.games.push({
        index: j,
        moves: gameData.moves.map((move) => move.split(" ")[0]),
        wTimestamps: gameData.moves
          .filter((_, index) => index % 2 === 0)
          .map((move) => Number(move.split(" ")[1].split("+")[0])),
        bTimestamps: gameData.moves
          .filter((_, index) => index % 2 !== 0)
          .map((move) => Number(move.split(" ")[1].split("+")[0])),
        wName: `${pairing.white.fname} ${pairing.white.lname ?? ""}`.trim(),
        bName: `${pairing.black.fname} ${pairing.black.lname ?? ""}`.trim(),
        result: pairing.result,
      })
    }

    rounds.push(round)
  }

  return (
    <Tabs defaultValue="0" className="pb-4">
      <RoundTabsList roundIndices={rounds.map((round) => round.index)} />
      {rounds.map((round) => (
        <TabsContent key={round.index} value={round.index.toString()}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {round.games.map((game) => (
              <DGTBoard key={game.index} {...game} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
