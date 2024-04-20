import React from 'react'


import { Website, columns } from '@/components/dashboard/publishers/websites/columns';
import { DataTable } from '@/components/dashboard/publishers/websites/data-table';



async function getData(): Promise<Website[]> {
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
 

export default async function WebsiteComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
