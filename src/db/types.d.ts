type Result = "WIN" | "LOSS" | "DRAW" | "NOT_PLAYED"

export type Player = {
  CFCId: number
  rating: number
  name: string
  age: number
  email: string
  isFemale: boolean
  isPlayingUp: boolean
  hasPaid: boolean
  result1?: Result
  result2?: Result
  result3?: Result
  result4?: Result
  result5?: Result
  result6?: Result
}
