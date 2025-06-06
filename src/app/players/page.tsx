import { RegisteredTable } from "@/components/page/registered-table"
import { getSectionPlayers } from "@/db/select"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Players",
}

export default async function Players() {
  const open = await getSectionPlayers(2000, 3000)
  const u2000 = await getSectionPlayers(1600, 1999)
  const u1600 = await getSectionPlayers(1200, 1599)
  const u1200 = await getSectionPlayers(0, 1199)
  const total = open.length + u2000.length + u1600.length + u1200.length

  return (
    <div className="h-full flex flex-col">
      <h1 className="pb-4 text-center font-bold text-4xl">Players ({total})</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 grow basis-0 pb-4">
        <RegisteredTable
          section={`2000 and Above (${open.length})`}
          players={open}
        />
        <RegisteredTable
          section={`1600 – 1999 (${u2000.length})`}
          players={u2000}
        />
        <RegisteredTable
          section={`1200 – 1599 (${u1600.length})`}
          players={u1600}
        />
        <RegisteredTable
          section={`U1200 and Unrated (${u1200.length})`}
          players={u1200}
        />
      </div>
    </div>
  )
}
