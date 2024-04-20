'use client'
import React from 'react'
import Link from "next/link";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvertiserForm from './signupforms/AdvertiserForm';
import PublisherForm from './signupforms/PublisherForm';




export default function SignUp() {
    return (
        <div>
            <Tabs defaultValue="Advertiser" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2 bg-gray-200">
                    <TabsTrigger value="Advertiser">Advertiser</TabsTrigger>
                    <TabsTrigger value="Publisher">Publisher</TabsTrigger>
                </TabsList>
                <TabsContent value="Advertiser">
                    <Card>
                        <CardContent>
                            <CardDescription className="mt-6">
                                Fill In to Create Your Advertiser Account
                            </CardDescription>

                            <AdvertiserForm />

                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/" className="underline">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Publisher">
                    <Card>
                        <CardContent>
                            <CardDescription className="mt-6">
                                Fill In to Create Your Publisher Account
                            </CardDescription>

                            <PublisherForm />

                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/" className="underline">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
