import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "../ui/card"
import { geistMono } from "@/assets/fonts/fonts"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"

export function StandingsTable({
  section,
  players,
}: {
  section: string
  players: {
    name: string
    r1: number
    r2: number
    r3: number
    r4: number
    r5: number
    r6: number
  }[]
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <h2 className="font-bold text-2xl text-center">{section}</h2>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 grow basis-0 flex flex-col">
        <ScrollArea className="min-h-[11.5rem] grow basis-0 overflow-y-auto p-4">
          <Table className={geistMono.className}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  <div className="w-[3ch]">1</div>
                </TableHead>
                <TableHead>
                  <div className="w-[3ch]">2</div>
                </TableHead>
                <TableHead>
                  <div className="w-[3ch]">3</div>
                </TableHead>
                <TableHead>
                  <div className="w-[3ch]">4</div>
                </TableHead>
                <TableHead>
                  <div className="w-[3ch]">5</div>
                </TableHead>
                <TableHead>
                  <div className="w-[3ch]">6</div>
                </TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.r1}</TableCell>
                  <TableCell>{player.r2}</TableCell>
                  <TableCell>{player.r3}</TableCell>
                  <TableCell>{player.r4}</TableCell>
                  <TableCell>{player.r5}</TableCell>
                  <TableCell>{player.r6}</TableCell>
                  <TableCell className="text-right">
                    {player.r1 +
                      player.r2 +
                      player.r3 +
                      player.r4 +
                      player.r5 +
                      player.r6}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
