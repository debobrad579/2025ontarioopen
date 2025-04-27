import { parsePGN } from "@/lib/parsers"
import { OngoingRoundContent } from "./ongoing-round-content"
import { DGTBoard } from "./dgt-board"
import type { RoundData } from "../types"

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

  if (!ongoing)
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
        result={game.result}
      />
    ))

  const roundData: RoundData = await fetch(
    `https://lichess.org/api/broadcast/-/-/${roundId}`
  ).then((res) => res.json())

  return (
    <OngoingRoundContent
      roundId={roundId}
      defaultGames={games.map((game, i) => ({
        ...game,
        thinkTime: roundData.games[i].thinkTime,
      }))}
    />
  )
}
