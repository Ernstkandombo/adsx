import React from 'react'
import Nav from '@/components/dashboard/Nav';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import CreateCampaigns from '@/components/dashboard/advertisers/CreateCampaigns';
import AddAdvert from '@/components/dashboard/advertisers/AddAdvert';
import Metrics from '@/components/dashboard/advertisers/Metrics';

import PlacementAssignComponent from '@/components/dashboard/advertisers/PlacementAssigns/PlacementAssignComponent';
import CampaignComponent from '@/components/dashboard/advertisers/campaign/CampaignComponent';
import AdvertComponent from '@/components/dashboard/advertisers/advert/AdvertComponent';


export default function page() {
    return (
        <div>
            <Nav />
            <main className="flex container min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Advertiser Dashboard</h1>
                </div>
                <section className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <Metrics />
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-2 md:grid-rows-2 lg:grid-rows-2 gap-4">

                    <section className="grid-item md:col-span-3 lg:col-span-3">
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Campains</CardTitle>
                                    <CardDescription>Manage Campaigns</CardDescription>
                                </div>
                                <CreateCampaigns />
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <CampaignComponent />
                            </CardContent>
                        </Card>
                    </section>

                    <section className="grid-item md:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2">
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Adverts</CardTitle>
                                    <CardDescription>Manage Adverts</CardDescription>
                                </div>
                                <AddAdvert />
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <AdvertComponent />
                            </CardContent>
                        </Card>
                    </section>

                    <section className="grid-item md:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-1">
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Placements Assignment</CardTitle>
                                    <CardDescription>View All Available Placements And Assign the Placements</CardDescription>
                                </div>
                             
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <PlacementAssignComponent />
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    )
}
