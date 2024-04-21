'use client'
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditPlacement from "./EditPlacement";
import DeletePlacement from "./DeletePlacement";

// Define the shape of the data for the Placement model
export type Placement = {
  _id: string; // Assuming Mongoose generates an _id field
  name: string;
  description: string;
  websiteId: string; // Assuming websiteId is of type string
  websiteUrl: string;
  publisherId: string; // Assuming publisherId is of type string
  zoneId: string; // Assuming zoneId is of type string
  width: number;
  height: number;
  dateCreated: Date;
};

export const columns: ColumnDef<Placement>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "websiteUrl",
    header: "Website URL",
  },
  
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const placement = row.original;

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
              <EditPlacement placementId={placement._id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeletePlacement placementId={placement._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
