import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";



export default function ZoneAssign({ ZoneAssignID }) {
  return (
    <Dialog>
        
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                     
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Assign Zones</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Assign Zone</DialogTitle>
                    <DialogDescription>
                        Make changes to your Zone. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                form for editing zone
            </DialogContent>
        </Dialog>
  )
}
