type Result = "WIN" | "LOSS" | "DRAW" | "NOT_PLAYED"
type AgeRange = "u18" | "18to64" | "65up"

export type Player = {
  CFCId: number
  rating: number
  firstName: string
  lastName: string
  ageRange: AgeRange
  email: string
  isFemale: boolean
  isPlayingUp: boolean
  hasPaid?: boolean
  result1?: Result
  result2?: Result
  result3?: Result
  result4?: Result
  result5?: Result
  result6?: Result
}
