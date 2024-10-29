"use client"

import { Separator } from "@/components/ui/separator"

export default function Error() {
  return (
    <div className="py-4 flex gap-4 items-center justify-center">
      <div className="font-bold text-4xl">500</div>
      <Separator orientation="vertical" className="h-10 bg-foreground" />
      <div className="font-bold text-4xl">Internal Server Error</div>
    </div>
  )
}
