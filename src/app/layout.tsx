import type { Metadata } from "next"
import { geistMono, geistSans } from "@/assets/fonts/fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { Navbar } from "./navbar"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "2025 Ontario Open",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
            <main className="h-full">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
