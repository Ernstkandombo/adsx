'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import CreateCampaignButton from './CreateCampainButton'




export default function Metrics() {
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
                    <CardDescription className="text-white font-bold py-2">Impressions</CardDescription>
                    <CardTitle className="text-4xl">1000</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
            </Card>
            <Card className="text-white bg-black md:col-start-4">
                <CardHeader className="pb-2">
                    <CardDescription className="text-white font-bold py-2">Clicks</CardDescription>
                    <CardTitle className="text-4xl">100</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
            </Card>
            <Card className="text-white bg-black md:col-start-5">
                <CardHeader className="pb-2">
                    <CardDescription className="text-white font-bold py-2">Revenue</CardDescription>
                    <CardTitle className="text-4xl">100</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
            </Card>
        </div>


    )
}
