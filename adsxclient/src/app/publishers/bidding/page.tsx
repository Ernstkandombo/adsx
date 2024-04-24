import React from 'react'
import Nav from '@/components/dashboard/Nav'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

export default async function page() {
  
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
                               
                            </CardContent>
                        </Card>
                    </section>
                   
                </div>
                
            
            </main>
        </div>
    )
}
