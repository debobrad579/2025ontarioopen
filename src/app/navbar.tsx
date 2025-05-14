"use client"

import { ModeToggle, ModeToggleMobile } from "@/components/themes/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logo from "@/assets/img/logo.svg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 680px)")

  return (
    <div className="flex justify-between items-center gap-4 px-5 py-3 sm:px-10 md:px-20 lg:px-[10vw] bg-card">
      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:outline-ring outline-offset-4 rounded-xl"
        >
          <Logo className="w-28" />
          <span className="sr-only">Home</span>
        </Link>
        {isDesktop && (
          <>
            <Button variant="ghost" asChild>
              <Link href="/players">Players</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://drive.google.com/file/d/1zatF7bkLtenGF9hOAY6cstqbWCnbxUKP"
                target="_blank"
              >
                Flyer
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://docs.google.com/document/d/1FBm3iEVuJkZsIf6exNB5hqvEc_8yrLTW"
                target="_blank"
              >
                Regulations
              </a>
            </Button>
          </>
        )}
      </div>
      {!isDesktop ? (
        <DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-8 px-2">
                <HamburgerMenuIcon className="w-16 h-16" />
                <span className="sr-only">Hamburger menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/players">Players</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://drive.google.com/file/d/1zatF7bkLtenGF9hOAY6cstqbWCnbxUKP"
                  target="_blank"
                >
                  Flyer
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://docs.google.com/document/d/1FBm3iEVuJkZsIf6exNB5hqvEc_8yrLTW"
                  target="_blank"
                >
                  Regulations
                </a>
              </DropdownMenuItem>
              <ModeToggleMobile />
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenu>
      ) : (
        <ModeToggle />
      )}
    </div>
  )
}
