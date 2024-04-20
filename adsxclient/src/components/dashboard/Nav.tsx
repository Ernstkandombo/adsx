'use client'
import React from 'react'
import Link from "next/link"
import { Variable } from "lucide-react";
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';




export default function Nav() {
    return (
        <div className="flex h-14 items-center px-4 border-b gap-4 bg-white">
            <div className="container flex h-14 items-center px-4">
                <Link className="flex items-center font-bold text-lg tracking-tight gap-2" href="#">
                    <Variable className="h-7 w-7 text-amber-500" />
                    AdsX
                </Link>
                <nav className="ml-auto flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full w-10 h-10 border" size="icon" variant="ghost">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>U</AvatarFallback>
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
    )
}

