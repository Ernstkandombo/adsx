'use client'



import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useSession } from "next-auth/react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { toast } from 'sonner';

export default function ReportButton() {
    const { data: session } = useSession(); 
    const userID = session?.user._id || '';
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${userID}`);
            const data = response.data;
            
            // Create PDF
            const docDefinition = createPDF(data);
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            const blob = await new Promise((resolve) => pdfDocGenerator.getBlob(resolve));
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success('Downloaded successfully!');
        } catch (error) {
            console.error('Error fetching data or generating PDF:', error);
            toast.error('Error fetching data or generating PDF');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const createPDF = (data) => {
        let docDefinition = {};
        
        // Check if data is from advertiser or publisher
        if (data?.userData?.role === 'advertiser') {
            docDefinition = createAdvertiserPDF(data);
        } else if (data?.userData?.role === 'publisher') {
            docDefinition = createPublisherPDF(data);
        }
        
        return docDefinition;
    };

    const createAdvertiserPDF = (data) => {
        // Generate PDF content for advertiser
        const docDefinition = {
            content: [
                { text: 'Advertiser Report', style: 'header' },
                { text: `Name: ${data.userData.name}`, style: 'subheader' },
                // Add more content as necessary
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            },
        };
        return docDefinition;
    };

    const createPublisherPDF = (data) => {
        // Generate PDF content for publisher
        const docDefinition = {
            content: [
                { text: 'Publisher Report', style: 'header' },
                { text: `Name: ${data.userData.name}`, style: 'subheader' },
                // Add more content as necessary
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            },
        };
        return docDefinition;
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