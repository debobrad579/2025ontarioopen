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
import { Player } from "@/db/types"
import { getAmount } from "@/lib/utils"
import { formatFIDETitle } from "@/lib/formatters"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

export function RegisterForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CFCId: "" as unknown as number,
      email: "",
      age: "18to64",
      isFemale: false,
      isPlayingUp: false,
    },
  })
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [player, setPlayer] = useState<Player | null>(null)
  const [exists, setExists] = useState(false)
  const [amount, setAmount] = useState(100)

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

            if (playerInfo.status === "Exists") {
              setExists(true)
            } else {
              setExists(false)
            }

            setPlayer(playerInfo.player)
            setAmount(getAmount(playerInfo.player))
            setIsDialogOpen(true)
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
                    onCheckedChange={field.onChange}
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
        <div className="text-center">
          <h2 className="font-bold text-xl">Discounts</h2>
          <p className="text-muted-foreground text-sm">
            Have proof available for onsite verification.
          </p>
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
                      onValueChange={field.onChange}
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
                      onCheckedChange={field.onChange}
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
          <div>{isPending ? "Registering" : "Register"}</div>
        </Button>
        {player != null && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>
                  {player.firstName} {player.lastName}
                  {player.FIDETitle != null &&
                    ` (${formatFIDETitle(player.FIDETitle)})`}{" "}
                  - {player.email}
                </DialogTitle>
                <DialogDescription className="flex gap-3 flex-wrap">
                  <div className="flex gap-1 items-center">
                    <div>Playing Up:</div>
                    {player.isPlayingUp ? <CheckIcon /> : <Cross2Icon />}
                  </div>
                  <div>
                    Birth Year:{" "}
                    {player.ageRange === "65up"
                      ? "1960 Or Earlier"
                      : player.ageRange === "u18"
                      ? "2005 Or Later"
                      : "1961 – 2005"}
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>Female:</div>
                    {player.isFemale ? <CheckIcon /> : <Cross2Icon />}
                  </div>
                </DialogDescription>
              </DialogHeader>
              {player.FIDETitle != null &&
              player.FIDETitle.includes("Grandmaster") ? (
                <p>You will be registered once we confirm your submission.</p>
              ) : (
                <>
                  {exists && (
                    <p>
                      CFC id <b>"{player.CFCId}"</b> has already been submitted,
                      but we have not received payment. If the above info is
                      incorrect, please contact us at{" "}
                      <a
                        href="mailto:2025ontarioopen@gmail.com"
                        className="text-blue-500 hover:underline"
                      >
                        2025ontarioopen@gmail.com
                      </a>
                      .
                    </p>
                  )}
                  <Button className="w-full" asChild>
                    <Link href={`/register/${player.CFCId}/checkout`}>
                      Proceed to Checkout (${amount})
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Or etransfer <b>${amount}</b> to{" "}
                    <a
                      href="mailto:2025ontarioopen@gmail.com"
                      className="text-blue-500 hover:underline"
                    >
                      2025ontarioopen@gmail.com
                    </a>
                  </p>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </form>
    </Form>
  )
}
