'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from 'axios';
import html2pdf from 'html2pdf.js';

export default function ReportButton() {
 const { data: session } = useSession(); 
  const userID = session?.user._id || '';
  const currentUserID = userID; // Extracting currentUserID from session


  // send the id to the API: axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${currentUserID}`)
  
  // once it gets back the data, it converts its to tables to be put on a pdf.
  // use the button to download the pdf. 

  // Function to fetch data from the backend and generate PDF
  const generatePDF = async () => {
    try {
      // Make a GET request to the backend API to fetch the report data
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${currentUserID}`);
  
      // Extract data from the response
      const reportData = response.data;
  
      // Convert the report data into HTML tables (customize this part based on your data structure)
      const tablesHTML = `
        <h2>Total Clicks: ${reportData.totalClicks}</h2>
        <h2>Total Impressions: ${reportData.totalImpressions}</h2>
        <!-- Add more HTML to display other report data as tables -->
      `;
  
      // Generate PDF from the HTML tables
      html2pdf().from(tablesHTML).save();
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div>
        <Button id='downloadPDFBtn' className="mx-4">
            <FileDown className="h-6 w-6 px-1 text-amber-500" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export Report</span>
            </Button>
  </div>
)
  
  // Event listener for the download PDF button
  document.getElementById('downloadPDFBtn').addEventListener('click', generatePDF);
  
}
