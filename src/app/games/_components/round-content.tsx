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
  const roundPGN = await fetch(
    `https://lichess.org/api/broadcast/round/${roundId}.pgn`
  ).then((res) => res.text())

  const games = roundPGN
    .split("\n\n\n")
    .filter((gamePGN) => gamePGN !== "")
    .map((gamePGN) => parsePGN(gamePGN))

  return !ongoing ? (
    games.map((game) => (
      <DGTBoard
        key={game.wName + game.bName}
        moves={game.moves}
        wTimestamps={game.wTimestamps}
        bTimestamps={game.bTimestamps}
        wName={game.wName}
        bName={game.bName}
        wTitle={game.wTitle}
        bTitle={game.bTitle}
        result={game.result}
      />
    ))
  ) : (
    <OngoingRoundContent roundId={roundId} defaultGames={games} />
  )
}
