import React from 'react'


import { ZoneAssign, columns } from '@/components/dashboard/advertisers/ZoneAssigns/columns';
import { DataTable } from '@/components/dashboard/advertisers/ZoneAssigns/data-table';



async function getData(): Promise<ZoneAssign[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "processing",
      email: "m@example.com",
      },
     {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
      {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
       {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
        {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
         {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
          {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
          
   
    // ...
  ]
}
 

export default async function ZoneAssignComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
