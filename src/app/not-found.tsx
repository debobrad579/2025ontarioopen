import { Separator } from "@/components/ui/separator"

export default function NotFound() {
  return (
    <div className="py-4 flex gap-4 items-center justify-center">
      <div className="font-bold text-4xl">404</div>
      <Separator orientation="vertical" className="h-10 bg-foreground" />
      <div className="font-bold text-4xl">Page Not Found</div>
    </div>
  )
}
