export function formatFIDETitle(title: string) {
  const matches = title
    .replace("Grandmaster", "GM")
    .replace("FIDE", "F")
    .match(/[A-Z]/g)
  return matches != null ? matches.join("") : title
}
