'use client'

import React, { useState, useEffect } from 'react';
import ReportExportButton from './publishers/ReportButton'; 
import Link from "next/link";
import { Import, Variable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import axios from 'axios';

export default function Nav() {
    const [userData, setUserData] = useState(null);
    const currentUserID = '66278baa053181ebcc05e0f7';
   
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch current user's data from the API
                 const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/publisher/${currentUserID}`); // Adjust the endpoint based on your backend setup
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Function to check if the user's role is 'publisher'
    const isPublisher = () => {
        return userData && userData.role === 'publisher';
    };

    // Function to get the first letter of the user's name
    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <div className="flex h-14 items-center px-4 border-b gap-4 bg-white">
            <div className="container flex h-14 items-center px-4 justify-between ">
                <div className="flex items-center">
                    <Link className="flex items-center font-bold text-lg tracking-tight gap-2" href="#">
                        <Variable className="h-7 w-7 text-amber-500" />
                        AdsX
                    </Link>
                    {/* Conditionally render the "Bidding" link if the user's role is 'publisher' */}
                    {isPublisher() && (
                        <div>
                            <Link href="/publishers/bidding" className="text-foreground font-semibold transition-colors mx-6 px-4 py-2 border rounded hover:text-foreground hover:text-amber-500">Bidding</Link>
                        </div>
                    )}
                </div>
                <nav className="ml-auto flex items-center space-x-4">
                    <div className="flex items-center tracking-tight gap-2" >
                        <ReportExportButton />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full w-10 h-10 border" size="icon" variant="ghost">
                                <Avatar>
                                    {userData && userData.avatar ? (
                                        <AvatarImage src={userData.avatar} alt="User Avatar" />
                                    ) : (
                                        userData?.name && <AvatarFallback>{getFirstLetter(userData.name)}</AvatarFallback>
                                    )}
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link href="/" className="w-full">Logout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </div>
    );
}
