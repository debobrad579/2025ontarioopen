import type { Metadata } from "next"
import { RegisterForm } from "./register-form"
import { getPlayersCount } from "@/db/select"

export const metadata: Metadata = {
  title: "Register",
}

export const revalidate = 0

export default async function Register() {
  const playerCount = await getPlayersCount()

  return (
    <div className="space-y-4">
      <h1 className="text-center font-bold text-4xl">Register</h1>
      <h2 className="font-bold text-xl">
        Unfortunately, we have to cap our entries at 180 (currently at {playerCount}).
        We can&apos;t reserve any more space and the room becomes too crowded to accommodate more.
        We apologize but feel this is the best option.
      </h2>
      <RegisterForm playerCount={playerCount} />
    </div>
  )
}
