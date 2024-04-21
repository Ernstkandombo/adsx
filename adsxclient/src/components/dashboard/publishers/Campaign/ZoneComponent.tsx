import React from 'react'
import axios from 'axios';


import { Campaign, columns } from '@/components/dashboard/publishers/Campaign/columns';
import { DataTable } from '@/components/dashboard/publishers/Campaign/data-table';




async function getData(): Promise<Campaign[]> {
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
 

export default async function CampaignComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
