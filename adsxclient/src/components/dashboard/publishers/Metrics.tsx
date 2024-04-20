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
import AddWebsite from './AddWebsite'




export default function Metrics() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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



            <Card className="text-white bg-black">
                <CardHeader className=" pb-2">
                    <CardDescription className="text-white font-bold py-2">Impressions</CardDescription>
                    <CardTitle className="text-4xl">1000</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
            </Card>
            <Card className="text-white bg-black">
                <CardHeader className="pb-2">
                    <CardDescription className="text-white font-bold py-2">Clicks</CardDescription>
                    <CardTitle className="text-4xl">100</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
            </Card>

        </div>
    )
}
