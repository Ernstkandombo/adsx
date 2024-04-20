import React from 'react'


import { Campaign, columns } from '@/components/dashboard/advertisers/campaign/columns';
import { DataTable } from '@/components/dashboard/advertisers/campaign/data-table';



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
