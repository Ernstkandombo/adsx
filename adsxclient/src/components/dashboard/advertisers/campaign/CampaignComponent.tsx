import React from 'react'
import axios from 'axios';

import { Campaign, columns } from '@/components/dashboard/advertisers/campaign/columns';
import { DataTable } from '@/components/dashboard/advertisers/campaign/data-table';
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
//import BidComponent from '../bidding/BidComponent';
import dynamic from 'next/dynamic';

const BidComponent = dynamic(() => import('@/components/dashboard/advertisers/bidding/BidComponent'), { ssr: false });



async function getData(): Promise<Campaign[]> {
   
const session = await getServerSession(authOptions);
  const userID = session.user._id  || '';
  const currentUserID =userID; // Extracting userID from session
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
    <>
      <DataTable columns={columns} data={data} />
      <BidComponent campaigns={data.filter(campaign => campaign.biddable)} /> {/* Pass biddable campaigns to BidComponent */}
    </>
  )
}
