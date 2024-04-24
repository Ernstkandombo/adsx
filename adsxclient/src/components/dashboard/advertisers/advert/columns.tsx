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

import EditAdvert from "./EditAdvert";
import DeleteAdvert from "./DeleteAdvert";
import ViewAdvertMetrix from "./ViewAdvertMetrix";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Advert = {
  _id: string;
  title: string;
  description: string;
  creative: string;

  clickUrl: string;
  campaignId: string;
  advertiserId: string;
  impressions: number;
  clicks: number;
  dateCreated: Date;
  ageRange: string[];
  gender: string[];
  interests: string[];
};

export const columns: ColumnDef<Advert>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "creative",
    header: "Creative",
  },
  
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Advert = row.original;
 
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
                <ViewAdvertMetrix AdvertID={Advert._id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <EditAdvert AdvertID={Advert._id} />
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
                <DeleteAdvert AdvertID={Advert._id} />
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
