export function formatFIDETitle(title: string) {
  const matches = title
    .replace("Grandmaster", "GM")
    .replace("FIDE", "F")
    .match(/[A-Z]/g)
  return matches != null ? matches.join("") : title
}

export function formatCapitalized(str: string) {
  return str
    .replace("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "CAD",
  style: "currency",
  minimumFractionDigits: 2,
})

export function formatCurrency(amountInDollars: number) {
  return CURRENCY_FORMATTER.format(amountInDollars)
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
})

export function formatDate(timestampInSeconds: number) {
  return DATE_FORMATTER.format(timestampInSeconds * 1000)
}

export function formatSeconds(s: number | undefined) {
  if (s == null) return "01:30:00"
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor(( s - hours * 3600 ) / 60 )
  const seconds = s - hours * 3600 - minutes * 60
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

