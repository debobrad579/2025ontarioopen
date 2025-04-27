import { Metadata } from "next"
import { DGTBoard } from "./_components/dgt-board"
import type { TournamentData } from "./types"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RoundTabsList } from "./_components/round-tabs-list"
import { Suspense } from "react"
import { RoundContent } from "./_components/round-content"

export const metadata: Metadata = {
  title: "Games",
}

export const revalidate = 0

export default async function Games() {
  const tournamentData: TournamentData = await fetch(
    `https://lichess.org/api/broadcast/${process.env.LICHESS_BROADCAST_ID}`
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
              <RoundContent
                roundId={tournamentData.rounds[i].id}
                ongoing={tournamentData.rounds[i].ongoing}
              />
            </Suspense>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
