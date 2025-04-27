"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import type { Round } from "../types"

export function RoundTabsList({ rounds }: { rounds: Round[] }) {
  const lg = useMediaQuery("(min-width: 550px)")

  return (
    <TabsList className="mb-4 w-full">
      {rounds.map((round) => (
        <TabsTrigger key={round.id} value={round.slug}>
          {lg && "Round "}
          {round.slug.replace("round-", "")}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
