import React from 'react'
import axios from 'axios';


import { CampaignAssignment, columns } from '@/components/dashboard/publishers/CampaignAssignments/columns';
import { DataTable } from '@/components/dashboard/publishers/CampaignAssignments/data-table';




async function getData(): Promise<CampaignAssignment[]> {

   return [
  {
    _id: "457689078907890",
    campaign: "hjkl;hjkl",
    placement: "success",
    website: "ken99@yahoo.com",
  },
  {
    _id: "457689078907890",
    campaign: "hjkl;hjkl",
    placement: "success",
    website: "ken99@yahoo.com",
    }
  ]
  
}
 

export default async function CampaignAssignmentComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
