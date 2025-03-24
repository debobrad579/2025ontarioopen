import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Register",
}

export default function Register() {
  return (
    <>
      <h1 className="pb-4 text-center font-bold text-4xl">Register</h1>
      <RegisterForm />
    </>
  )
}
