import { Game } from "@/app/games/types"

export function parseFEN(fen: string) {
  const rows = fen.split(" ")[0].split("/")
  const board = rows.map((row) => {
    const expandedRow: (string | null)[] = []
    for (const character of row) {
      if (isNaN(Number(character))) {
        expandedRow.push(character)
      } else {
        expandedRow.push(...Array(Number(character)).fill(null))
      }
    }
    return expandedRow
  })
  return board
}

export function parsePGN(gamePGN: string): Game {
  const lines = gamePGN.split("\n")
  const game: Game = {
    wName: "",
    bName: "",
    wTimestamps: [],
    bTimestamps: [],
    wTitle: "",
    bTitle: "",
    result: "",
    moves: [],
  }

  for (const line of lines) {
    if (line.startsWith('[White "')) {
      game.wName = line.split('"')[1]
    } else if (line.startsWith('[Black "')) {
      game.bName = line.split('"')[1]
    } else if (line.startsWith('[Result "')) {
      game.result = line.split('"')[1]
    } else if (line.startsWith('[WhiteTitle "')) {
      game.wTitle = line.split('"')[1]
    } else if (line.startsWith('[BlackTitle "')) {
      game.bTitle = line.split('"')[1]
    } else if (line.startsWith("1.")) {
      const moves: string[] = []

      for (const move of line
        .split(" ")
        .filter(
          (move: string) =>
            /^[a-zA-Z0-9+#=-]+$/.test(move) && move !== game.result
        )) {
        moves.push(move)
      }
      game.moves = moves

      const wTimestamps: number[] = []
      const bTimestamps: number[] = []
      const moveParts = line.split("}")

      for (let i = 0; i < moveParts.length; i++) {
        const match = moveParts[i].match(/\d+:\d+:\d+|\d+:\d+/)
        if (!match) continue
        const timeParts = match[0].split(":").map(Number)
        const timestamp = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
        if (i % 2 === 0 && timestamp != null) {
          wTimestamps.push(timestamp)
        } else if (timestamp != null) {
          bTimestamps.push(timestamp)
        }
      }
      game.wTimestamps = wTimestamps
      game.bTimestamps = bTimestamps
    }
  }

  return game
}
