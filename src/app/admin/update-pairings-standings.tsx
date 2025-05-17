"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { resetPairingsAction, updatePairingsAction } from "./actions";

export function UpdatePairingsStandings() {
  const [fileContent, setFileContent] = useState<{ section: string; txt: string }[]>([])
  const [isPending, startTransition] = useTransition()
  const [isResetPending, startResetTransition] = useTransition()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, section: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const txt = e.target?.result
        if (typeof txt === "string") {
          setFileContent((prev) => [...prev, { section, txt }])
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Pairings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
            <Label htmlFor="p-open">Open:</Label>
            <Input className="w-full" id="p-open" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "pOpen")} />
            <Label htmlFor="p-u2000">U2000:</Label>
            <Input className="w-full" id="p-u2000" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "pU2000")} />
            <Label htmlFor="p-u1600">U1600:</Label>
            <Input className="w-full" id="p-u1600" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "pU1600")} />
            <Label htmlFor="p-u1200">U1200:</Label>
            <Input className="w-full" id="p-u1200" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "pU1200")} />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} className="w-full" onClick={() => {
            startTransition(async () => {
              await updatePairingsAction(fileContent)
            })
          }}>
            Update
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Standings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
            <Label htmlFor="s-open">Open:</Label>
            <Input className="w-full" id="s-open" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "sOpen")} />
            <Label htmlFor="s-u2000">U2000:</Label>
            <Input className="w-full" id="s-u2000" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "sU2000")} />
            <Label htmlFor="s-u1600">U1600:</Label>
            <Input className="w-full" id="s-u1600" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "sU1600")} />
            <Label htmlFor="s-u1200">U1200:</Label>
            <Input className="w-full" id="s-u1200" type="file" accept=".txt" onChange={(e) => handleFileChange(e, "sU1200")} />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full" disabled={isResetPending} onClick={() => {
            startResetTransition(async () => {
              await resetPairingsAction()
            })
          }}>Reset</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
