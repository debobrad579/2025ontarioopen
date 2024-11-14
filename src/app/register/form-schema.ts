import { z } from "zod"

export const formSchema = z.object({
  CFCId: z.coerce
    .number({ message: "Invalid CFC id" })
    .int({ message: "Invalid CFC id" })
    .min(100000, "Invalid CFC id")
    .max(199999, "Invalid CFC id"),
  email: z.string().email({ message: "Invalid email" }),
  isPlayingUp: z.boolean(),
  age: z.enum(["u18", "18to64", "65up"]),
  isFemale: z.boolean(),
  isFIDEMaster: z.boolean(),
})

export type FormSchemaType = z.infer<typeof formSchema>
export type FormSchemaKey = keyof FormSchemaType
