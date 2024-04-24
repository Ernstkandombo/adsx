import React from 'react'
import axios from 'axios';


import { Campaign, columns } from '@/components/dashboard/publishers/Campaign/columns';
import { DataTable } from '@/components/dashboard/publishers/Campaign/data-table';




async function getData(): Promise<Campaign[]> {
    // Fetch data from your API here.
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/`);
    return response.data; // Assuming your API returns an array of Advert objects
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return empty array in case of an error
  }
  
}
 

export default async function CampaignComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
