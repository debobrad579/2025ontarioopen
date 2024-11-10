import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Games",
}

export default function Live() {
  return (
    <iframe
      src="https://view.livechesscloud.com/#eb1275c0-8a83-4980-925f-3a1286a286a0"
      width="100%"
      height="100%"
    />
  )
}
