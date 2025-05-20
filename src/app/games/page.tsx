import { Metadata } from "next"
import type { TournamentData } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoundContent } from "./_components/round-content"

export const metadata: Metadata = {
  title: "Games",
}

export default async function Games() {
  if (!process.env.LICHESS_BROADCAST_ID) return <h1 className="font-bold text-xl text-center">Games Have Not Started Yet</h1>

  const { rounds }: TournamentData = await fetch(
    `https://lichess.org/api/broadcast/${process.env.LICHESS_BROADCAST_ID}`
  ).then((res) => res.json())

  return (
    <Tabs defaultValue="round-1" className="pb-4">
      <TabsList className="mb-4 w-full">
        {rounds.map((round) => (
          <TabsTrigger
            key={round.id}
            value={round.slug}
            className="sm:before:content-['Round'] flex gap-[1ch]"
            disabled={round.startsAt > Date.now()}
          >
            {round.slug.at(-1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {rounds.map((round) => (
        <TabsContent key={round.id} value={round.slug}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <RoundContent roundId={round.id} ongoing={false} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
