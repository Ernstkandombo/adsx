'use client'
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

export default function AddWebsite() {
    return (
        
            
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Website</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="my-2">Add New Website</DialogTitle>
          <DialogDescription>Fill in the details below to add a new Website.</DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
    )
}
