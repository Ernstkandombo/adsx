import React from 'react'

import axios from 'axios';
import { PlacementAssign, columns } from '@/components/dashboard/advertisers/PlacementAssigns/columns';
import { DataTable } from '@/components/dashboard/advertisers/PlacementAssigns/data-table';



async function getData(): Promise<PlacementAssign[]> {
  // Fetch data from your API here.
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Placement/`);
    return response.data; // Assuming your API returns an array of Advert objects
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return empty array in case of an error
  }
}
 

export default async function PlacementAssignComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
