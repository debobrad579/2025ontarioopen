import { geistMono } from "@/assets/fonts/fonts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllPlayers } from "@/db/select"
import { PaidButton } from "./paid-button"

export const revalidate = 0

export default async function Admin() {
  const players = await getAllPlayers()

  return (
    <div className="px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-center">
            Registered Players
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-96 overflow-y-auto p-4">
            <Table className={geistMono.className}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-0"></TableHead>
                  <TableHead className="w-48">Name</TableHead>
                  <TableHead className="w-48">Email</TableHead>
                  <TableHead>CFC Id</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.CFCId}>
                    <TableCell>
                      <PaidButton player={player} />
                    </TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>
                      <a
                        href={`https://www.chess.ca/en/ratings/p/?id=${player.CFCId}`}
                        target="_blank"
                        className="hover:underline text-blue-500"
                      >
                        {player.CFCId}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      {player.rating}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
