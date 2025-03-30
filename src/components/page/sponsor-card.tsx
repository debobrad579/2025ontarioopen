import { Card, CardContent } from "../ui/card"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

export function SponsorCard({
  Logo,
  description,
  href,
}: {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  Logo: ({}: any) => JSX.Element
  description: string
  href?: string
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full focus-visible:outline-none focus-visible:border focus-visible:border-ring rounded-xl">
        <Card>
          <CardContent className="p-[calc(2rem+0.92ch)]">
            <Logo className="aspect-[4/1] scale-[1.75]" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="p-0 w-[calc(100%-4rem)] max-h-[calc(100%-4rem)] max-w-3xl rounded-xl bg-card">
        <ScrollArea className="max-h-[calc(100vh-4rem)] p-8">
          <a href={href} target="_blank">
            <Logo className="aspect-[4/1] scale-150" />
          </a>
          <p className="text-center pt-4 text-xl">{description}</p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
