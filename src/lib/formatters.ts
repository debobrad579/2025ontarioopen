export function formatFIDETitle(title: string) {
  const matches = title
    .replace("Grandmaster", "GM")
    .replace("FIDE", "F")
    .match(/[A-Z]/g)
  return matches != null ? matches.join("") : title
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "CAD",
  style: "currency",
  minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}
