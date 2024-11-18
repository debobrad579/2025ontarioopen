"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createPlayerAction } from "./actions"
import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { type FormSchemaType, formSchema } from "./form-schema"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function RegisterForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CFCId: "" as unknown as number,
      email: "",
      age: "18to64",
      isFemale: false,
      isPlayingUp: false,
      isFIDEMaster: false,
    },
  })
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [amount, setAmount] = useState(100)

  function calculateAmount(
    isPlayingUp: boolean,
    age: "u18" | "18to64" | "65up",
    isFemale: boolean,
    isFIDEMaster: boolean
  ) {
    setAmount(
      100 +
        Number(isPlayingUp) * 20 -
        Math.min(
          Number(isFemale) * 10 +
            Number(age !== "18to64") * 10 +
            Number(isFIDEMaster) * 10,
          20
        )
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          startTransition(async () => {
            const playerInfo = await createPlayerAction(values)

            if (playerInfo.status === "Error") {
              return form.setError(playerInfo.field, {
                type: "manual",
                message: playerInfo.message,
              })
            }

            setIsDialogOpen(true)
            setName(playerInfo.name)
            setRating(playerInfo.rating)
            calculateAmount(
              values.isPlayingUp,
              values.age,
              values.isFemale,
              values.isFIDEMaster
            )
          })
        })}
        className="space-y-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="CFCId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-24">CFC Id:</FormLabel>
                <FormControl>
                  <Input placeholder="177347" {...field} />
                </FormControl>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-between">
                <FormDescription>
                  Don&apos;t know your CFC id? Check the crosstables at{" "}
                  <a
                    href="https://www.chess.ca/en/ratings/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    chess.ca/en/ratings/
                  </a>
                  .
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-24">Email:</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-between">
                <FormDescription>
                  For us to contact you about any updates.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPlayingUp"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-24">Play up?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(e) => {
                      calculateAmount(
                        e.valueOf() as boolean,
                        form.getValues().age,
                        form.getValues().isFemale,
                        form.getValues().isFIDEMaster
                      )
                      field.onChange(e)
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
              <FormDescription>
                Must be within <b>100 points</b> of the next section up{" "}
                <b>on May 17th, 2025</b>.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex gap-1 items-center justify-center">
          <h2 className="font-bold text-xl">Discounts</h2>
          <p className="text-muted-foreground text-sm">(maximum $20)</p>
        </div>
        <div className="flex space-x-10 flex-wrap justify-center">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-1 items-center">
                    <FormLabel>Birth Year</FormLabel>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e) => {
                        calculateAmount(
                          form.getValues().isPlayingUp,
                          e.valueOf() as "u18" | "18to64" | "65up",
                          form.getValues().isFemale,
                          form.getValues().isFIDEMaster
                        )
                        field.onChange(e)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col min-[450px]:flex-row gap-4"
                    >
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="65up" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          1960 Or Earlier
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="18to64" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          1961 &ndash; 2004
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="u18" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          2005 Or Later
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFemale"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center sm:gap-4">
                  <FormLabel className="w-24 sm:w-auto">Female</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => {
                        calculateAmount(
                          form.getValues().isPlayingUp,
                          form.getValues().age,
                          e.valueOf() as boolean,
                          form.getValues().isFIDEMaster
                        )
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFIDEMaster"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center sm:gap-4">
                  <FormLabel className="w-24 sm:w-auto">FIDE Master</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => {
                        calculateAmount(
                          form.getValues().isPlayingUp,
                          form.getValues().age,
                          form.getValues().isFemale,
                          e.valueOf() as boolean
                        )
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full flex gap-2 items-center"
          disabled={isPending}
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          <div>{isPending ? "Registering" : `Register ($${amount})`}</div>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="border-foreground">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{rating}</DialogDescription>
            </DialogHeader>
            <p>
              Your registration will be confirmed upon receipt of your
              e-transfer of <b>${amount}</b> to{" "}
              <a
                href="mailto:2025ontarioopen@gmail.com"
                className="text-blue-500 hover:underline"
              >
                2025ontarioopen@gmail.com
              </a>
              .
            </p>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}
