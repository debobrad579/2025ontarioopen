import { parsePGN } from "@/lib/parsers"
import { OngoingRoundContent } from "./ongoing-round-content"
import { DGTBoard } from "./dgt-board"

export async function RoundContent({
  roundId,
  ongoing,
}: {
  roundId: string
  ongoing: boolean
}) {
  if (!ongoing) {
    const roundPGN = await fetch(
      `https://lichess.org/api/broadcast/round/${roundId}.pgn`
    ).then((res) => res.text())

    const games = roundPGN
      .split("\n\n\n")
      .filter((gamePGN) => gamePGN !== "")
      .map((gamePGN) => parsePGN(gamePGN))

    return games.map((game) => (
      <DGTBoard
        key={game.wName + game.bName}
        moves={game.moves}
        wTimestamps={game.wTimestamps}
        bTimestamps={game.bTimestamps}
        wName={game.wName}
        bName={game.bName}
        wTitle={game.wTitle}
        bTitle={game.bTitle}
        wElo={game.wElo}
        bElo={game.bElo}
        result={game.result}
      />
    ))
  }

  return <OngoingRoundContent roundId={roundId} />
}
