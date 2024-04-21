import React from 'react'
import axios from 'axios';


import { Website, columns } from '@/components/dashboard/publishers/websites/columns';
import { DataTable } from '@/components/dashboard/publishers/websites/data-table';



async function getData(): Promise<Website[]> {
  // Fetch data from your API here.
 try {
    const response = await axios.get('http://localhost:5001/api/websites/');
    return response.data; // Assuming your API returns an array of Advert objects
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return empty array in case of an error
  }
}
 

export default async function WebsiteComponent() {
      
    const data = await getData()


  return (
     <DataTable columns={columns} data={data} />
  )
}
