import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPairings } from "@/db/select";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pairings",
}

export default async function Pairings() {
  const [open, u2000, u1600, u1200] = await Promise.all([getPairings("pOpen"), getPairings("pU2000"), getPairings("pU1600"), getPairings("pU1200")])

  return (
    <Tabs defaultValue="open">
      <TabsList className="w-full">
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="u2000">U2000</TabsTrigger>
        <TabsTrigger value="u1600">U1600</TabsTrigger>
        <TabsTrigger value="u1200">U1200/Unr.</TabsTrigger>
      </TabsList>
      <TabsContent value="open">
        <PairingsTable pairings={open.pairings} title={open.title} />
      </TabsContent>
      <TabsContent value="u2000">
        <PairingsTable pairings={u2000.pairings} title={u2000.title} />
      </TabsContent>
      <TabsContent value="u1600">
        <PairingsTable pairings={u1600.pairings} title={u1600.title} />
      </TabsContent>
      <TabsContent value="u1200">
        <PairingsTable pairings={u1200.pairings} title={u1200.title} />
      </TabsContent>
    </Tabs>
  )
}

function PairingsTable({ pairings, title }: { pairings: { [key: string]: string }[], title: string }) {
  if (pairings.length === 0) return <h1 className="font-bold text-xl text-center">Pairings Not Posted Yet</h1>

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl text-center">{title}</h1>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Bd</TableHead>
            <TableHead>#</TableHead>
            <TableHead>Res</TableHead>
            <TableHead>White</TableHead>
            <TableHead>#</TableHead>
            <TableHead>Res</TableHead>
            <TableHead>Black</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pairings.map(pairing => (
            <TableRow key={pairing.bd}>
              <TableCell>{pairing.bd}</TableCell>
              <TableCell>{pairing.n}</TableCell>
              <TableCell>{pairing.res}</TableCell>
              <TableCell>{pairing.white}</TableCell>
              <TableCell>{pairing.n1}</TableCell>
              <TableCell>{pairing.res1}</TableCell>
              <TableCell>{pairing.black}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
     )
}
