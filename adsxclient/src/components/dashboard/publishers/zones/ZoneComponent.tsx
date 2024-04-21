import React from 'react'
import axios from 'axios';


import { Zone, columns } from '@/components/dashboard/publishers/zones/columns';
import { DataTable } from '@/components/dashboard/publishers/zones/data-table';



async function getData(): Promise<Zone[]> {
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
      status: "pending",
      email: "m@example.com",
      },
    
   
    // ...
  ]
}
 

export default async function ZoneComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
