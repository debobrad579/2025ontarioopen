"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function RoundTabsList() {
  "use client"

  const lg = useMediaQuery("(min-width: 550px)")

  return (
    <TabsList className="mb-4 w-full">
      <TabsTrigger value="r1">{!lg ? "1" : "Round 1"}</TabsTrigger>
      <TabsTrigger value="r2">{!lg ? "2" : "Round 2"}</TabsTrigger>
      <TabsTrigger value="r3">{!lg ? "3" : "Round 3"}</TabsTrigger>
      <TabsTrigger value="r4">{!lg ? "4" : "Round 4"}</TabsTrigger>
      <TabsTrigger value="r5">{!lg ? "5" : "Round 5"}</TabsTrigger>
      <TabsTrigger value="r6">{!lg ? "6" : "Round 6"}</TabsTrigger>
    </TabsList>
  )
}
