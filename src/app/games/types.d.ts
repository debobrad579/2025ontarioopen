export type Game = {
  moves: string[]
  result: "1-0" | "0-1" | "1/2-1/2" | "*"
  thinkTime?: number
  white: { name: string; elo: string; timestamps: number[]; title?: string }
  black: { name: string; elo: string; timestamps: number[]; title?: string }
}

export type TournamentData = {
  tour: Tour
  rounds: Round[]
  defaultRoundId: string
}

export type RoundData = {
  tour: Tour
  round: Round
  study: unknown
  games: TGame[]
}

type TGame = {
  id: string
  name: string
  fen: string
  players: unknown
  lastMove: string
  thinkTime?: number
  status: string
}

type Tour = {
  id: string
  name: string
  slug: string
  info: Record<string, unknown>
  createdAt: number
  url: string
  tier: number
  dates: number[]
}

type Player = {
  name: string
  title: string
  rating: number
  clock: number
  fed: string
}

type Round = {
  id: string
  name: string
  slug: string
  createdAt: number
  ongoing: boolean
  startsAt: number
  url: string
}
