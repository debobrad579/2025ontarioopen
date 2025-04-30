import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkeletonDGTBoard } from "./_components/skeleton-dgt-board"

export default function Loading() {
  return (
    <Tabs defaultValue="0" className="pb-4">
      <TabsList className="mb-4 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <TabsTrigger
            key={i}
            value={i.toString()}
            className="sm:before:content-['Round'] flex gap-[1ch]"
            disabled
          >
            {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-end">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonDGTBoard key={i} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
