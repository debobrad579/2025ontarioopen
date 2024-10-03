import { Separator } from "@/components/ui/separator"

export default function NotFound() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="font-bold text-2xl">404</div>
      <Separator orientation="vertical" className="h-10" />
      <div className="font-bold text-2xl">Page Not Found</div>
    </div>
  )
}
