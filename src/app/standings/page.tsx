import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPairings } from "@/db/select";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standings",
}

export default async function Standings() {
  const [open, u2000, u1600, u1200] = await Promise.all([getPairings("sOpen"), getPairings("sU2000"), getPairings("sU1600"), getPairings("sU1200")])

  return (
    <Tabs defaultValue="open">
      <TabsList className="w-full">
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="u2000">U2000</TabsTrigger>
        <TabsTrigger value="u1600">U1600</TabsTrigger>
        <TabsTrigger value="u1200">U1200</TabsTrigger>
      </TabsList>
      <TabsContent value="open">
        <PairingsTable standings={open.pairings} title={open.title} />
      </TabsContent>
      <TabsContent value="u2000">
        <PairingsTable standings={u2000.pairings} title={u2000.title} />
      </TabsContent>
      <TabsContent value="u1600">
        <PairingsTable standings={u1600.pairings} title={u1600.title} />
      </TabsContent>
      <TabsContent value="u1200">
        <PairingsTable standings={u1200.pairings} title={u1200.title} />
      </TabsContent>
    </Tabs>
  )
}

function PairingsTable({ standings, title }: { standings: { [key: string]: string }[], title: string }) {
  if (standings.length === 0) return <h1 className="font-bold text-xl text-center">Standings Not Posted Yet</h1>

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl text-center">{title}</h1>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Place</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Round 1</TableHead>
            <TableHead>Round 2</TableHead>
            <TableHead>Round 3</TableHead>
            <TableHead>Round 4</TableHead>
            <TableHead>Round 5</TableHead>
            <TableHead>Round 6</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.toSorted((a, b) => Number(a) - Number(b)).map(standing => (
            <TableRow key={standing.n}>
              <TableCell>{standing.place}</TableCell>
              <TableCell>{standing.name}</TableCell>
              <TableCell>{standing.rating}</TableCell>
              <TableCell>{standing.rd1}</TableCell>
              <TableCell>{standing.rd2}</TableCell>
              <TableCell>{standing.rd3}</TableCell>
              <TableCell>{standing.rd4}</TableCell>
              <TableCell>{standing.rd5}</TableCell>
              <TableCell>{standing.rd6}</TableCell>
              <TableCell>{standing.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
     )
}
