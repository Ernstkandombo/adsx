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





// Define the type for the Campaign
export type CampaignAssignment = {
  _id: string;
  campaign: string;
  placement: string;
  website: string;
  
};

export const columns: ColumnDef<CampaignAssignment>[] = [
 {
    accessorKey: "_id",
    header: "Campaign Assignment",
  },
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "placement",
    header: "placement",
  },
   {
    accessorKey: "website",
    header: "website",
  },
  
 
]
