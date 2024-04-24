import React from 'react'
import axios from 'axios';

import { Campaign, columns } from '@/components/dashboard/advertisers/campaign/columns';
import { DataTable } from '@/components/dashboard/advertisers/campaign/data-table';



async function getData(): Promise<Campaign[]> {
    const currentUserID = "66278b87053181ebcc05e0ea";
// Fetch data from your API here.
try {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/advertiser/${currentUserID}`);
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
