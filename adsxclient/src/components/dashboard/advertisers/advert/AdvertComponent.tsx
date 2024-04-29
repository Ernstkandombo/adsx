
import React from 'react'
import axios from 'axios';

import { Advert, columns } from '@/components/dashboard/advertisers/advert/columns';
import { DataTable } from '@/components/dashboard/advertisers/advert/data-table';
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';


async function getData(): Promise<Advert[]> {
  const session = await getServerSession(authOptions);
  const userID = session.user._id  || '';
  const currentUserID =userID; // Extracting userID from session
// Fetch data from your API here.
try {
  const response = await axios.get(`http://localhost:5001/api/aditem/advertiser/${currentUserID}`, { next: { revalidate: 1 } });
  return response.data; // Assuming your API returns an array of Advert objects
} catch (error) {
  console.error('Error fetching data:', error);
  return []; // Return empty array in case of an error
}
  
}
 

export default async function AdvertComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
 