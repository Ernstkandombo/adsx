'use client'

import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input component
import { Label } from '@/components/ui/label'; // Import Label component

export default function CreateCampaigns() {
        
    const currentUserID = "66278b87053181ebcc05e0ea";
  
       const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        dailyBudget: '',
         totalBudget: '',
        advertiserId: currentUserID, 
    
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/campaign', formData); // Adjust the URL to match your backend API endpoint
            console.log('Campaign created successfully');
            toast.success('Campaign created successfully');
        } catch (error) {
            console.error('Error creating campaign:', error);
            toast.error('Error creating campaign');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="ml-auto gap-1s gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">create Campaign</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Create New Campaign</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new Campaign.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <Label>Name:</Label>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Description:</Label>
                            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Start Date:</Label>
                            <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>End Date:</Label>
                            <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Daily Budget:</Label>
                            <Input type="number" name="dailyBudget" value={formData.dailyBudget} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Total Budget:</Label>
                            <Input type="number" name="totalBudget" value={formData.totalBudget} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter className="py-8">
                        <Button type="submit">Create Campaign</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
