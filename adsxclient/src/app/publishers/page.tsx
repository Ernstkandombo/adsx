import React from 'react'
import Nav from '@/components/dashboard/Nav'
import Metrics from '@/components/dashboard/publishers/Metrics';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

import CampaignComponent from '@/components/dashboard/publishers/Campaign/CampaignComponent';
import WebsiteComponent from '@/components/dashboard/publishers/websites/WebsiteComponent';
import PlacementComponent from '@/components/dashboard/publishers/placement/PlacementComponent';
import CreatePlacement from '@/components/dashboard/publishers/createPlacement';
export default async function page() {
  
    return (
        <div>
            <Nav />
            <main className="flex container min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Publisher Dashboard</h1>
                </div>
                <section className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <Metrics />
                </section>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-2 md:grid-rows-2 lg:grid-rows-2 gap-4">

                    <section className="grid-item md:col-span-3 lg:col-span-3">
                       <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Websites</CardTitle>
                                    <CardDescription>All Your Websites</CardDescription>
                                </div>

                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <WebsiteComponent />
                            </CardContent>
                        </Card>
                    </section>
                    <section className="grid-item md:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2">
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Placement Assignment</CardTitle>
                                    <CardDescription>View All Available Placement </CardDescription>
                                </div>
                             <CreatePlacement />
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <PlacementComponent />
                            </CardContent>
                        </Card>
                    </section>
                    <section className="grid-item md:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-1">
                             <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Campaigns</CardTitle>
                                    <CardDescription>View ALL Availables Campaigns</CardDescription>
                                </div>
                                
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <CampaignComponent />
                            </CardContent>
                        </Card>

                        
                    </section>

                    
                </div>
                
            
            </main>
        </div>
    )
}
