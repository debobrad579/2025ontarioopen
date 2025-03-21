"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import { useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

export function FeaturedPlayerCard({
  name,
  title,
  image,
  description,
}: {
  name: string
  title: string
  image: string | StaticImport
  description: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const handler = () => {
      if (divRef.current == null || paragraphRef.current == null) return
      paragraphRef.current.style.webkitLineClamp = Math.floor(
        divRef.current.clientHeight /
          parseFloat(getComputedStyle(paragraphRef.current).lineHeight)
      ).toString()
    }

    handler()

    window.addEventListener("resize", handler)

    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger className="focus-visible:outline-none focus-visible:border focus-visible:border-ring rounded-xl">
        <Card>
          <CardHeader className="p-4 pb-0 flex-row justify-between items-center">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{title}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 p-4">
            <Image
              src={image}
              alt="placeholder"
              sizes="(min-width: 1024px) 12.5vw, 25vw"
              className="w-1/4 h-1/4 border rounded-xl"
            />
            <div ref={divRef} className="w-3/4 aspect-[4/1] overflow-hidden">
              <p ref={paragraphRef} className="line-clamp-[unset] text-left">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="p-0 w-[calc(100%-4rem)] max-h-[calc(100%-4rem)] max-w-4xl rounded-xl bg-card">
        <ScrollArea className="max-h-[calc(100vh-4rem)] p-8">
          <DialogHeader className="pb-4">
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Image
              src={image}
              alt="placeholder"
              width={256}
              height={256}
              className="border rounded-xl"
            />
            <p>{description}</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
