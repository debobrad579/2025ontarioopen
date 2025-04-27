import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DGTBoard } from "./_components/dgt-board"

export default function Loading() {
  return (
    <Tabs defaultValue={"1"} className="pb-4">
      <TabsList className="mb-4 w-full">
        {["1", "2", "3", "4", "5", "6"].map((i) => (
          <TabsTrigger key={i} value={i} disabled>
            {i}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <DGTBoard
            key={i}
            moves={[]}
            wTimestamps={[]}
            bTimestamps={[]}
            wName=""
            bName=""
            wTitle=""
            bTitle=""
            wElo=""
            bElo=""
            result=""
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}
