'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddWebsite from './AddWebsite';

export default function Metrics() {
    const [metricsData, setMetricsData] = useState(null);
    const currentUserID = "6623849609fafa84003e556b";

    useEffect(() => {
        const fetchMetricsData = async () => {
            try {
                const response = await axios.post(`http://localhost:5001/api/report/publisher/${currentUserID}`);
                setMetricsData(response.data);
            } catch (error) {
                console.error('Error fetching metrics data:', error);
            }
        };

        fetchMetricsData();
    }, [currentUserID]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-4">
            <Card className="sm:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle>Websites</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed py-2">
                        Add Your Website Here
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <AddWebsite />
                </CardFooter>
            </Card>

            <Card className="text-white bg-black md:col-start-3">
                <CardHeader className="pb-2">
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
                    <CardDescription className="text-white font-bold py-2">Total Revenue</CardDescription>
                    <CardTitle className="text-4xl">{metricsData ? `N$ ${metricsData.totalRevenue}` : '-'}</CardTitle>
                </CardHeader>
                <CardContent>
           
                </CardContent>
            </Card>
        </div>
    );
}
