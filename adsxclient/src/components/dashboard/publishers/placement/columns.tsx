"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EditZone from "./EditPlacement"
import DeleteZone from "./DeletePlacement"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Zone = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Zone>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const zone = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="flex flex-col">
            <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <EditZone ZoneID={zone.id} />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
                <DeleteZone ZoneID={zone.id} />
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
