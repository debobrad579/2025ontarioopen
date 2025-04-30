import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function SkeletonDGTBoard() {
  return (
    <div className="@container">
      <div className="flex flex-col @lg:flex-row gap-2">
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex justify-between w-full p-2 bg-gray-800">
              <div className="animate-pulse bg-gray-200 h-4 w-1/3" />
              <div className="animate-pulse bg-gray-200 h-4 w-1/6" />
            </div>
            <div className="aspect-square grid grid-cols-8 grid-rows-8 relative">
              {Array.from({ length: 64 }).map((_, i) => {
                const isLightSquare = (Math.floor(i / 8) + (i % 8)) % 2 === 0
                return (
                  <div
                    key={i}
                    className={cn(
                      "animate-pulse",
                      isLightSquare ? "bg-gray-300" : "bg-gray-500"
                    )}
                  />
                )
              })}
            </div>
            <div className="flex justify-between w-full p-2 bg-gray-200">
              <div className="animate-pulse bg-gray-800 h-4 w-1/3" />
              <div className="animate-pulse bg-gray-800 h-4 w-1/6" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full" disabled>
              <ChevronFirst />
            </Button>
            <Button className="w-full" disabled>
              <ChevronLeft />
            </Button>
            <Button className="w-full" disabled>
              <ChevronRight />
            </Button>
            <Button className="w-full" disabled>
              <ChevronLast />
            </Button>
          </div>
        </div>
        <div className="w-[10.5rem] pr-1 aspect-video overflow-hidden hidden @lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3" />
                </TableCell>
                <TableCell>
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
                </TableCell>
                <TableCell>
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3" />
                  </TableCell>
                  <TableCell>
                    <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3 grid justify-self-end" />
                </TableCell>
                <TableCell className="">
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3 grid justify-self-center" />
                </TableCell>
                <TableCell>
                  <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3" />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="w-full pb-2 @lg:hidden">
          <div />
          <div className="flex gap-4 w-full overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-3" />
                <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
                <div className="animate-pulse bg-gray-800 dark:bg-gray-200 h-4 w-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
