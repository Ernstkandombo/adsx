import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlusCircle } from "lucide-react";
import { Button } from '@/components/ui/button';


export default function CreateZone() {
    return (

        
        
         <Dialog>
      <DialogTrigger asChild>
       <Button size="sm" className="ml-auto gap-1s gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Zone</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="my-2">Create New Zone</DialogTitle>
          <DialogDescription>Fill in the details below to create a new Zone.</DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
    )
}
