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

import EditCampaign from "./EditCampaign";
import DeleteCampaign from "./DeleteCampaign";

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
  impressions: number;
  dateCreated: Date;
};

// Define the columns for the React table
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
   
  },
  {
    accessorKey: "endDate",
    header: "End Date",
     
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
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const campaign = row.original;

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
              <EditCampaign CampaignID={campaign._id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteCampaign CampaignID={campaign._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
