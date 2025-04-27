import { Metadata } from "next"
import type { TournamentData } from "./types"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RoundTabsList } from "./_components/round-tabs-list"
import { RoundContent } from "./_components/round-content"

export const metadata: Metadata = {
  title: "Games",
}

export const revalidate = 0

export default async function Games() {
  const tournamentData: TournamentData = await fetch(
    `https://lichess.org/api/broadcast/${process.env.LICHESS_BROADCAST_ID}`
  ).then((res) => res.json())

  const ongoingRounds = tournamentData.rounds.filter((round) => round.ongoing)

  return (
    <Tabs
      defaultValue={
        ongoingRounds.length === 0 ? "round-1" : ongoingRounds[0].slug
      }
      className="pb-4"
    >
      <RoundTabsList rounds={tournamentData.rounds} />
      {tournamentData.rounds.map((round) => (
        <TabsContent key={round.id} value={round.slug}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-end">
            <RoundContent roundId={round.id} ongoing={round.ongoing} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
