'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export default function ReportButton() {
    const { data: session } = useSession(); 
    const userID = session?.user._id || '';
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            toast.promise(fetchAndProcessData(), {
                loading: 'Loading...',
                success: () => 'Downloaded successfully!',
                error: () => 'Error downloading report',
            });
        } catch (error) {
            console.error('Error fetching data or generating PDF:', error);
            toast.error('Error fetching data or generating PDF');
        } finally {
            setLoading(false);
        }
    };

    const fetchAndProcessData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${userID}`);
            const data = response.data;
            generatePDF(data);
           
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
        }
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();
        
        if (data?.userData?.role === 'advertiser') {
            createAdvertiserPDF(doc, data);
        } else if (data?.userData?.role === 'publisher') {
            createPublisherPDF(doc, data);
        }
        
        // Trigger download
        doc.save('report.pdf');
    };

 const createAdvertiserPDF = (doc, data) => {
    doc.text('Advertiser Report', 10, 10);
    doc.text(`Name: ${data.userData.name}`, 10, 20);

    // Campaign data
    doc.text('Campaigns:', 10, 40);
    data.campaignData.forEach((campaign, index) => {
        const y = 50 + index * 10;
        doc.text(`- ${campaign.campaignName}: Clicks: ${campaign.totalClicks}, Impressions: ${campaign.totalImpressions}, Cost: ${campaign.totalCost}`, 15, y);
    });

    // Metrix data
    const yMetrix = 50 + data.campaignData.length * 10 + 20;
    doc.text(`Total Clicks: ${data.metrixData.totalClicks}`, 10, yMetrix);
    doc.text(`Total Impressions: ${data.metrixData.totalImpressions}`, 10, yMetrix + 10);
    doc.text(`Total Cost: ${data.metrixData.totalCost}`, 10, yMetrix + 20);
};


const createPublisherPDF = (doc, data) => {
    doc.text('Publisher Report', 10, 10);
    doc.text(`Name: ${data.userData.name}`, 10, 20);

    // Campaign assignment data
    doc.text('Campaign Assignments:', 10, 40);
    data.campaignAssignmentData.forEach((assignment, index) => {
        const y = 50 + index * 10;
        doc.text(`- ${assignment.websiteName}: Clicks: ${assignment.clicks}, Impressions: ${assignment.impressions}`, 15, y);
    });

    // Metrix data
    const yMetrix = 50 + data.campaignAssignmentData.length * 10 + 20;
    doc.text(`Total Clicks: ${data.metrixData.totalClicks}`, 10, yMetrix);
    doc.text(`Total Impressions: ${data.metrixData.totalImpressions}`, 10, yMetrix + 10);
    doc.text(`Total Revenue: ${data.metrixData.totalRevenue}`, 10, yMetrix + 20);
};


    return (
        <div>
            <Button className="mx-4" onClick={handleDownload} disabled={loading}>
                <FileDown className="h-6 w-6 px-1 text-amber-500" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export Report</span>
            </Button>
        </div>
    );
}
