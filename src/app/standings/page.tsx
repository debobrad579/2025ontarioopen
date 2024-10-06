import { StandingsTable } from "@/components/page/standings-table"

export default function Standings() {
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[10vw] h-full flex flex-col">
      <h1 className="py-4 text-center font-bold text-4xl">Standings</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 grow basis-0 pb-4">
        <StandingsTable
          section="2000 and Above"
          players={[
            { name: "A. Smith", r1: 0.5, r2: 1, r3: 0, r4: 1, r5: 0, r6: 1 },
            { name: "B. Lee", r1: 1, r2: 0.5, r3: 0, r4: 1, r5: 1, r6: 0 },
            { name: "C. Turner", r1: 1, r2: 1, r3: 0.5, r4: 0, r5: 0, r6: 1 },
            { name: "D. Carter", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 0, r6: 0 },
            { name: "E. Mitchell", r1: 1, r2: 0, r3: 1, r4: 0.5, r5: 1, r6: 0 },
            { name: "A. Smith", r1: 0.5, r2: 1, r3: 0, r4: 1, r5: 0, r6: 1 },
            { name: "B. Lee", r1: 1, r2: 0.5, r3: 0, r4: 1, r5: 1, r6: 0 },
            { name: "C. Turner", r1: 1, r2: 1, r3: 0.5, r4: 0, r5: 0, r6: 1 },
            { name: "D. Carter", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 0, r6: 0 },
            { name: "E. Mitchell", r1: 1, r2: 0, r3: 1, r4: 0.5, r5: 1, r6: 0 },
          ]}
        />
        <StandingsTable
          section="1600 - 1999"
          players={[
            {
              name: "F. Jackson",
              r1: 0.5,
              r2: 1,
              r3: 1,
              r4: 0,
              r5: 0.5,
              r6: 1,
            },
            {
              name: "G. Roberts",
              r1: 1,
              r2: 0.5,
              r3: 0.5,
              r4: 1,
              r5: 1,
              r6: 0,
            },
            { name: "H. Phillips", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 1, r6: 1 },
            {
              name: "I. Thompson",
              r1: 1,
              r2: 0,
              r3: 0.5,
              r4: 1,
              r5: 0.5,
              r6: 0,
            },
            { name: "J. Stewart", r1: 1, r2: 1, r3: 0, r4: 0.5, r5: 1, r6: 0 },
            {
              name: "F. Jackson",
              r1: 0.5,
              r2: 1,
              r3: 1,
              r4: 0,
              r5: 0.5,
              r6: 1,
            },
            {
              name: "G. Roberts",
              r1: 1,
              r2: 0.5,
              r3: 0.5,
              r4: 1,
              r5: 1,
              r6: 0,
            },
            { name: "H. Phillips", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 1, r6: 1 },
            {
              name: "I. Thompson",
              r1: 1,
              r2: 0,
              r3: 0.5,
              r4: 1,
              r5: 0.5,
              r6: 0,
            },
            { name: "J. Stewart", r1: 1, r2: 1, r3: 0, r4: 0.5, r5: 1, r6: 0 },
          ]}
        />
        <StandingsTable
          section="1200 - 1599"
          players={[
            { name: "K. Walker", r1: 0, r2: 1, r3: 1, r4: 0.5, r5: 0, r6: 1 },
            {
              name: "L. Hernandez",
              r1: 0.5,
              r2: 0.5,
              r3: 0,
              r4: 1,
              r5: 1,
              r6: 1,
            },
            {
              name: "M. Gonzalez",
              r1: 1,
              r2: 0.5,
              r3: 1,
              r4: 0,
              r5: 0.5,
              r6: 1,
            },
            { name: "N. Kim", r1: 1, r2: 1, r3: 0, r4: 0.5, r5: 0, r6: 0 },
            { name: "O. Brooks", r1: 1, r2: 0, r3: 0.5, r4: 1, r5: 1, r6: 1 },
            { name: "K. Walker", r1: 0, r2: 1, r3: 1, r4: 0.5, r5: 0, r6: 1 },
            {
              name: "L. Hernandez",
              r1: 0.5,
              r2: 0.5,
              r3: 0,
              r4: 1,
              r5: 1,
              r6: 1,
            },
            {
              name: "M. Gonzalez",
              r1: 1,
              r2: 0.5,
              r3: 1,
              r4: 0,
              r5: 0.5,
              r6: 1,
            },
            { name: "N. Kim", r1: 1, r2: 1, r3: 0, r4: 0.5, r5: 0, r6: 0 },
            { name: "O. Brooks", r1: 1, r2: 0, r3: 0.5, r4: 1, r5: 1, r6: 1 },
          ]}
        />
        <StandingsTable
          section="U1200 and Unrated"
          players={[
            { name: "P. Wright", r1: 0.5, r2: 1, r3: 0, r4: 1, r5: 1, r6: 0 },
            { name: "Q. Scott", r1: 1, r2: 0, r3: 0.5, r4: 1, r5: 0, r6: 1 },
            { name: "R. Adams", r1: 0.5, r2: 0.5, r3: 1, r4: 0, r5: 1, r6: 0 },
            { name: "S. Barnes", r1: 1, r2: 1, r3: 0.5, r4: 0, r5: 0, r6: 1 },
            { name: "T. Evans", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 0.5, r6: 1 },
            { name: "P. Wright", r1: 0.5, r2: 1, r3: 0, r4: 1, r5: 1, r6: 0 },
            { name: "Q. Scott", r1: 1, r2: 0, r3: 0.5, r4: 1, r5: 0, r6: 1 },
            { name: "R. Adams", r1: 0.5, r2: 0.5, r3: 1, r4: 0, r5: 1, r6: 0 },
            { name: "S. Barnes", r1: 1, r2: 1, r3: 0.5, r4: 0, r5: 0, r6: 1 },
            { name: "T. Evans", r1: 0, r2: 0.5, r3: 1, r4: 1, r5: 0.5, r6: 1 },
          ]}
        />
      </div>
    </div>
  )
}
