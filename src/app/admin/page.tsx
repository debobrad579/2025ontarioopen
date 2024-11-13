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
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"

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
          <ScrollArea className="h-96 overflow-auto p-4">
            <Table className={geistMono.className}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-0"></TableHead>
                  <TableHead className="w-48">Name</TableHead>
                  <TableHead>CFC Id</TableHead>
                  <TableHead className="w-48">Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Female</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.CFCId}>
                    <TableCell>
                      <PaidButton player={player} />
                    </TableCell>
                    <TableCell>
                      {player.lastName}, {player.firstName}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://www.chess.ca/en/ratings/p/?id=${player.CFCId}`}
                        target="_blank"
                        className="hover:underline text-blue-500"
                      >
                        {player.CFCId}
                      </a>
                    </TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>
                      {player.ageRange == "u18"
                        ? "Under 18"
                        : player.ageRange == "18to64"
                        ? "18 - 64"
                        : "65+"}
                    </TableCell>
                    <TableCell>
                      {player.isFemale ? <CheckIcon /> : <Cross2Icon />}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.rating === 0 ? "Unrated" : player.rating}
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
