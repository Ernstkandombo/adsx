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
  campaignAssignmentID: string;
  campaignName: string;
  placementName: string;
  websiteURL: string;
  
};

export const columns: ColumnDef<CampaignAssignment>[] = [
 {
    accessorKey: "campaignAssignmentID",
    header: "Campaign Assignment",
  },
  {
    accessorKey: "campaignName",
    header: "Campaign",
  },
  {
    accessorKey: "placementName",
    header: "placement",
  },
   {
    accessorKey: "websiteURL",
    header: "website",
  },
  
 
]
