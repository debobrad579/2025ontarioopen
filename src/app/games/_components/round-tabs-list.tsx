"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function RoundTabsList({ roundIndices }: { roundIndices: number[] }) {
  const lg = useMediaQuery("(min-width: 550px)")

  return (
    <TabsList className="mb-4 w-full">
      {[0, 1, 2, 3, 4, 5].map((roundIndex) => (
        <TabsTrigger
          key={roundIndex}
          value={roundIndex.toString()}
          disabled={!roundIndices.includes(roundIndex)}
        >
          {lg && "Round "}
          {roundIndex + 1}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
