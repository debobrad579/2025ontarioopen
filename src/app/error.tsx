"use client"

import { Separator } from "@/components/ui/separator"

export default function Error() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="font-bold text-2xl">500</div>
      <Separator orientation="vertical" className="h-10" />
      <div className="font-bold text-2xl">Internal Server Error</div>
    </div>
  )
}
