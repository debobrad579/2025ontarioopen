import { Metadata } from "next"
import { DGTBoard } from "./_components/dgt-board"
import type { Game, TournamentData } from "./types"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RoundTabsList } from "./_components/round-tabs-list"
import { Suspense } from "react"
import { parseRoundPGN } from "@/lib/parsers"

export const metadata: Metadata = {
  title: "Games",
}

export default async function Games() {
  const tournamentData: TournamentData = await fetch(
    "https://lichess.org/api/broadcast/fPr26dbV"
  ).then((res) => res.json())

  return (
    <Tabs defaultValue="round-1" className="pb-4">
      <RoundTabsList />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <TabsContent key={i} value={`round-${i + 1}`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-end">
            <Suspense
              fallback={[0, 1, 2, 3, 4, 5].map((i) => (
                <DGTBoard
                  key={i}
                  moves={[]}
                  wTimestamps={[]}
                  bTimestamps={[]}
                  wTitle=""
                  bTitle=""
                  wName=""
                  bName=""
                  result=""
                />
              ))}
            >
              <RoundsContent roundIndex={i} tournamentData={tournamentData} />
            </Suspense>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

async function RoundsContent({
  roundIndex,
  tournamentData,
}: {
  roundIndex: number
  tournamentData: TournamentData
}) {
  let games: Game[] = []

  for (let i = 0; i < 6; i++) {
    const roundPgn = await fetch(
      `https://lichess.org/api/broadcast/round/${tournamentData.rounds[roundIndex].id}.pgn`
    ).then((res) => res.text())
    games = parseRoundPGN(roundPgn)
  }

  return games.map((game) => (
    <DGTBoard
      key={game.wName + game.bName}
      moves={game.moves}
      wTimestamps={game.wTimestamps}
      bTimestamps={game.bTimestamps}
      wName={game.wName}
      bName={game.bName}
      wTitle={game.wTitle}
      bTitle={game.bTitle}
      result={game.result}
    />
  ))
}
