import { parsePGN } from "@/lib/parsers"
import { OngoingRoundContent } from "./ongoing-round-content"
import { DGTBoard } from "./dgt-board/dgt-board"

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
      <DGTBoard key={game.white.name + game.black.name} gameData={game} />
    ))
  }

  return <OngoingRoundContent roundId={roundId} />
}
