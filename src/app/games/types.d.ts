export type TournamentJson = {
  id: string
  name: string
  location: string | null
  country: string | null
  website: string | null
  rules: string
  chess960: string
  timecontrol: string
  rounds: {
    count: number
    live: number
  }[]
  eboards: string[]
}

export type IndexJson = {
  date: string | null
  pairings: {
    white: Player
    black: Player
    result: string
    live: boolean
  }[]
}

export type GameJson = {
  live: boolean
  serialNr: string
  firstMove: number
  chess960: number
  result: string
  comment: string | null
  clock: string | null
  moves: string[]
}

type Player = {
  fname: string
  mname: string | null
  lname: string | null
  title: string | null
  federation: string | null
  gender: string | null
  fideid: string | null
}

export type Round = {
  index: number
  games: Game[]
}

type Game = {
  index: number
  moves: string[]
  wTimestamps: number[]
  bTimestamps: number[]
  wName: string
  bName: string
  result: string
}
