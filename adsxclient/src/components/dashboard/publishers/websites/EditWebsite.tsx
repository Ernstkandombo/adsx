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


export default function EditWebsite({ WebsiteID }) {
  return (
    <Dialog>
        
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                    Edit Website
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Edit Website</DialogTitle>
                    <DialogDescription>
                        Make changes to your Website. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                form for editing Website
            </DialogContent>
        </Dialog>
  )
}
