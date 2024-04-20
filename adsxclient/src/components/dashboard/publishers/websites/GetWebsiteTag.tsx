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


export default function GetWebsiteTag({ WebsiteID }) {
  return (
    <Dialog>
        
            <DialogTrigger asChild>
                <Button className="m-1">
                    Get Website Tag
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Get Website Tag</DialogTitle>
                    <DialogDescription>
                        Get Website Tag For Your Specific Zone.
                    </DialogDescription>
                </DialogHeader>
                form for Website Tag
            </DialogContent>
        </Dialog>
  )
}
