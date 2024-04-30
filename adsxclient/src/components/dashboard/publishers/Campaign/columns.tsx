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

import AssignCampaign from "./CamapignAssign"



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
  

]
