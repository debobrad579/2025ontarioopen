import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Register",
}

export default function Register() {
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[10vw]">
      <h1 className="py-4 text-center font-bold text-4xl">Register</h1>
      <RegisterForm />
    </div>
  )
}
