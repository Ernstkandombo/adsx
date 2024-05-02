import React from 'react'
import axios from 'axios';

import { Placement, columns } from '@/components/dashboard/publishers/placement/columns';
import { DataTable } from '@/components/dashboard/publishers/placement/data-table';
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';



async function getData(): Promise<Placement[]> {
const session = await getServerSession(authOptions);
  const userID = session.user._id  || '';
  const currentUserID =userID; // Extracting userID from session
// Fetch data from your API here.
try {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/placement/publisher/${currentUserID}`);
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


