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

import CampaignBidding from "./CamapignBidding"
import moment from "moment"


// Define the type for the Campaign
export type Campaign = {
  _id: string;
  name: string;
  description: string;
  advertiserId: string;
  startDate: Date;
  endDate: Date;
  dailyBudget: number;
  totalBudget: number;
  clicks: number;
  costPerClick: number;
  costPerImpression: number;
  impressions: number;
  dateCreated: Date;
};

export const columns: ColumnDef<Campaign>[] = [
 {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
   cell: ({ value }) => {return moment(value).local().format("DD/MM/YYYY");},
  },
  {
    accessorKey: "endDate",
    header: "End Date",
     cell: ({ value }) => {return moment(value).local().format("DD/MM/YYYY");},
  },
  {
    accessorKey: "dailyBudget",
    header: "Daily Budget",
  },
  {
    accessorKey: "totalBudget",
    header: "Total Budget",
  },
  {
    accessorKey: "costPerClick",
    header: "cost/Click",
  },
   {
    accessorKey: "costPerImpression",
    header: "cost/Impression",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Campaign = row.original
 
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
                <CampaignBidding CampaignID={Campaign._id} />
            </DropdownMenuItem>

           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
