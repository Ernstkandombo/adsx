"use client"

import { ColumnDef } from "@tanstack/react-table";
import PlacementAssign from "./PlacementAssign";
import moment from "moment";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PlacementAssign = {
 _id: string;
  name: string;
  description: string;
  publisherId: string;
  width: number;
  height: number;
  dateCreated: Date;
};

export const columns: ColumnDef<PlacementAssign>[] = [
 {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ value }) => {return moment(value).local().format("DD/MM/YYYY");},
  },
  
];
