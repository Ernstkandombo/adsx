import React from 'react'
import axios from 'axios';

import { Placement, columns } from '@/components/dashboard/publishers/Placement/columns';
import { DataTable } from '@/components/dashboard/publishers/Placement/data-table';




async function getData(): Promise<Placement[]> {
  // Fetch data from your API here.
  try {
    const response = await axios.get('http://localhost:5001/api/placement/');
    return response.data; // Assuming your API returns an array of Advert objects
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return empty array in case of an error
  }
}
 

export default async function PlacementComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}


