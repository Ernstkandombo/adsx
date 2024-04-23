import React from 'react'
import axios from 'axios';


import { CampaignAssignment, columns } from '@/components/dashboard/publishers/CampaignAssignments/columns';
import { DataTable } from '@/components/dashboard/publishers/CampaignAssignments/data-table';




async function getData(): Promise<CampaignAssignment[]> {
const currentUserID = "66278baa053181ebcc05e0f7";
// Fetch data from your API here.
try {
  const response = await axios.get(`http://localhost:5001/api/campaignassignment/${currentUserID}`);
  return response.data; // Assuming your API returns an array of Advert objects
} catch (error) {
  console.error('Error fetching data:', error);
  return []; // Return empty array in case of an error
}

}
 

export default async function CampaignAssignmentComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
