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
import { Player } from "@/db/types"

export function RegisteredTable({
  section,
  players,
}: {
  section: string
  players: Player[]
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
                <TableHead className="w-48">Name</TableHead>
                <TableHead>CFC Id</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.CFCId}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>
                    <a
                      href={`https://www.chess.ca/en/ratings/p/?id=${player.CFCId}`}
                      target="_blank"
                      className="hover:underline text-blue-500"
                    >
                      {player.CFCId}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">{player.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
