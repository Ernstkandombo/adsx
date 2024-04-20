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

export default function CreateCampainButton() {
    return (
       
          <Dialog>
      <DialogTrigger asChild>
       <Button>Create New Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="my-2">Create New Campaign</DialogTitle>
          <DialogDescription>Fill in the details below to create a new Campaign.</DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
    )
}
