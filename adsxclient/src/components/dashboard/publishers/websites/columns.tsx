"use client"

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

import EditWebsite from "./EditWebsite";
import DeleteWebsite from "./DeleteWebsite";
import GetWebsiteTag from "./GetWebsiteTag";

// Define the shape of the data for the Website model
export type Website = {
  _id: string; // Assuming Mongoose generates an _id field
  name: string;
  url: string;
  description?: string;
  category?: string;
  dateCreated: Date;
  ageRange?: string[];
  gender?: string[];
  interests?: string[];
};

export const columns: ColumnDef<Website>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
 
  {
    id: "actions",
    cell: ({ row }) => {
      const website = row.original;

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
              <GetWebsiteTag />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditWebsite websiteId={website._id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteWebsite websiteId={website._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
