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
import { useRef } from "react"
import { useEventListener } from "@/hooks/useEventListener"

export function GrandmasterCard({
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
  const handleResize = () => {
    if (divRef.current == null || paragraphRef.current == null) return

    const lineHeight = parseFloat(
      getComputedStyle(paragraphRef.current).lineHeight
    )
    const containerHeight = divRef.current.clientHeight
    const lines = Math.floor(containerHeight / lineHeight)
    paragraphRef.current.style.webkitLineClamp = lines.toString()
  }

  const divRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  useEventListener("load", handleResize, window)
  useEventListener("resize", handleResize, window)

  return (
    <Card>
      <CardHeader className="pb-0 flex-row justify-between">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 p-4">
        <Image src={image} alt="placeholder" className="w-1/3 h-1/3" />
        <div ref={divRef} className="w-2/3 aspect-[3/1] overflow-hidden">
          <p ref={paragraphRef} className="line-clamp-[unset]">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
