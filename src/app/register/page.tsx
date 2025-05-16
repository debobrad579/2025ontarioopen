import type { Metadata } from "next"
import { RegisterForm } from "./register-form"
import { getPlayersCount } from "@/db/select"

export const metadata: Metadata = {
  title: "Register",
}

export default async function Register() {
  const playerCount = await getPlayersCount()

  return (
    <div className="space-y-4">
      <h1 className="text-center font-bold text-4xl">Register</h1>
      <h2 className="font-bold text-xl">
        This is for administrative purposes only; registering through this page will lead to a dead end!
      </h2>
      <RegisterForm playerCount={playerCount} />
    </div>
  )
}
