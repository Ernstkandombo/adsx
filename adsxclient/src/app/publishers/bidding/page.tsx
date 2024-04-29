import React from 'react'
import Nav from '@/components/dashboard/Nav'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import CampaignAssignmentComponent from '@/components/dashboard/publishers/Bidding/CampaignAssignments/CampaignAssignmentComponent';
import CampaignComponent from '@/components/dashboard/publishers/Bidding/Campaign/CampaignComponent';


export default async function page() {
   const session = await getServerSession(authOptions);

    if(session.user.userType != 'publisher') {

	    return(
            <section className="h-screen w-full  justify-center items-center">
                <div className="container p-10">
                    <h1 className="text-2xl font-bold text-center ">
                        You are not Authorized to view this page.
                    </h1>
                </div>
            </section>
        )

    }   
    return (
        <div>
            <Nav />
            <main className="flex container min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Publisher-Bidding Dashboard</h1>
                </div>
                 <div className="">

                    <section className="">
                       <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle className="text-xls">Bidding</CardTitle>
                                    <CardDescription>Do all your bidding here</CardDescription>
                                </div>

                            </CardHeader>
                            <CardContent className="grid gap-8">
                               
                                <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-6">
                                    <div >
                                        <Card>
                                            <CardContent className="grid gap-8">
                                                <CampaignComponent />
                                            </CardContent>
                                        </Card>
                                       
                                    </div>
                                    <div >
                                        <Card>
                                            <CardContent className="grid gap-8">
                                                <CampaignAssignmentComponent />
                                            </CardContent>
                                        </Card>
                                       
                                    </div>
                                </div>
    
                            </CardContent>
                        </Card>
                    </section>
                   
                </div>
                
            
            </main>
        </div>
    )
}
