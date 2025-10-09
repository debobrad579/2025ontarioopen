import type { Metadata } from "next"
import { geistMono, geistSans } from "@/assets/fonts/fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { Navbar } from "./navbar"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: {
    template: "%s | 2025 Ontario Open Chess Championship",
    default: "2025 Ontario Open Chess Championship",
  },
  description:
    "Compete in the 2025 Ontario Open Chess Championship! Exciting prizes and top-tier competition for players of all levels on May 17–19, Brantford, Ontario.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-full">
            <div>
              <Navbar />
              <Separator />
            </div>
            <main className="h-full px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
