'use client'

import React from 'react';
import ReportExportButton from './ReportButton';
import Link from "next/link";
import { Variable, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Notification from './Notification';


export default function Nav() {
    const router = useRouter();
    const { data: session } = useSession();

    // Function to check if the user's userType is 'publisher'
    const isPublisher = () => {
        return session && session.user && session.user.userType === 'publisher';
    };

    // Function to get the first letter of the user's name
    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <div className="flex h-14 items-center px-4 border-b gap-4 bg-white">
            <div className="container flex h-14 items-center px-4 justify-between ">
                <div className="flex items-center">
                    <Link onClick={() => router.back()} className="flex items-center font-bold text-lg tracking-tight gap-2" href="#">
                        <Variable className="h-7 w-7 text-amber-500" />
                        AdsX
                    </Link>
                    {/* Conditionally render the "Bidding" link if the user's userType is 'publisher' */}
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
                    <div className="flex items-center tracking-tight gap-2">
                    
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                    <Bell className="h-4 w-4" />
                                    <span className="sr-only">Toggle notifications</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Notification />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full w-10 h-10 border" size="icon" variant="ghost">
                                <Avatar>
                                    {session && session.user && session.user.avatar ? (
                                        <AvatarImage src={session.user.avatar} alt="User Avatar" />
                                    ) : (
                                        session && session.user && session.user.name && <AvatarFallback>{getFirstLetter(session.user.name)}</AvatarFallback>
                                    )}
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {session && session.user && (
                                <>
                                    <DropdownMenuLabel>
                                        {session.user.name.length > 10 ? session.user.name.substring(0, 12) + "..." : session.user.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                </>
                            )}

                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link onClick={() => signOut()} href="/" className="w-full">Logout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </div>
    );
}
