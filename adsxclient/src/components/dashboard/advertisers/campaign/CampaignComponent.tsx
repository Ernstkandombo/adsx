import React from 'react'
import axios from 'axios';

import { Campaign, columns } from '@/components/dashboard/advertisers/campaign/columns';
import { DataTable } from '@/components/dashboard/advertisers/campaign/data-table';



async function getData(): Promise<Campaign[]> {
    const currentUserID = "66241266565c9aa620c7402a";
// Fetch data from your API here.
try {
  const response = await axios.get(`http://localhost:5001/api/campaign/advertiser/${currentUserID}`);
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
