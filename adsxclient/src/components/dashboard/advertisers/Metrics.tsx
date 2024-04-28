'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreateCampaignButton from './CreateCampainButton';
import { useSession } from "next-auth/react";

export default function Metrics() {
    const [metricsData, setMetricsData] = useState(null);
  const { data: session } = useSession(); 
  const userID = session?.user._id || {};
  const currentUserID = userID; // Extracting currentUserID from session
       

    useEffect(() => {
        const fetchMetricsData = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/advertiser/${currentUserID}`);
                setMetricsData(response.data);
            } catch (error) {
                console.error('Error fetching metrics data:', error);
            }
        };

        fetchMetricsData();
    }, [currentUserID]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-4">
            <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle>Campaigns</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed py-2">
                        Create Your Campaigns here
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <CreateCampaignButton />
                </CardFooter>
            </Card>

            <Card className="text-white bg-black md:col-start-3">
                <CardHeader className=" pb-2">
                    <CardDescription className="text-white font-bold py-2">Total Impressions</CardDescription>
                    <CardTitle className="text-4xl">{metricsData ? metricsData.totalImpressions : '-'}</CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className="text-white bg-black md:col-start-4">
                <CardHeader className="pb-2">
                    <CardDescription className="text-white font-bold py-2">Total Clicks</CardDescription>
                    <CardTitle className="text-4xl">{metricsData ? metricsData.totalClicks : '-'}</CardTitle>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
            </Card>
            <Card className="text-white bg-black md:col-start-5">
                <CardHeader className="pb-2">
                    <CardDescription className="text-white font-bold py-2">Total Cost</CardDescription>
                    <CardTitle className="text-4xl">{metricsData ? `N$ ${metricsData.totalCost}` : '-'}</CardTitle>
                </CardHeader>
                <CardContent>
               
                </CardContent>
            </Card>
        </div>
    );
}
