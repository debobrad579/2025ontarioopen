import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import type { StaticImport } from "next/dist/shared/lib/get-img-props"

export function GrandmasterCard({
  image,
  description,
}: {
  image: string | StaticImport
  description: string
}) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4 items-center">
        <Image src={image} alt="placeholder" className="w-1/3 h-1/3" />
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
