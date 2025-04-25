"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function RoundTabsList() {
  const lg = useMediaQuery("(min-width: 550px)")

  return (
    <TabsList className="mb-4 w-full">
      {["round-1", "round-2", "round-3", "round-4", "round-5", "round-6"].map(
        (i) => (
          <TabsTrigger key={i} value={i}>
            {lg && "Round "}
            {i.replace("round-", "")}
          </TabsTrigger>
        )
      )}
    </TabsList>
  )
}
