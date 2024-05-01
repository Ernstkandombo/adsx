'use client'



import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input component
import { Label } from '@/components/ui/label'; // Import Label component
import { useSession } from "next-auth/react";

export default function CreateCampaigns() {
    const { data: session } = useSession(); 
  const userID = session?.user._id || "";
  const [currentUserID, setCurrentUserID] = useState(() => {
    // Initialize currentUserID from sessionStorage if available, or set it to userID
    const storedUserID = sessionStorage.getItem('currentUserID');
    return storedUserID ? storedUserID : userID;
  });

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        dailyBudget: '',
        totalBudget: '',
        costPerClick: '',
        costPerImpression: '',
        advertiserId: currentUserID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };

        if (name === 'startDate' || name === 'endDate' || name === 'totalBudget') {
            const { startDate, endDate, totalBudget } = newFormData;
            const totalBudgetFloat = parseFloat(totalBudget);
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            const durationInDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
            const dailyBudget = (totalBudgetFloat / durationInDays).toFixed(2);

            newFormData = { ...newFormData, dailyBudget };
        }

        if (name === 'costPerClick' || name === 'costPerImpression') {
            newFormData = { ...newFormData, [name]: value };
        }

        setFormData(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign`, formData);
            console.log('Campaign created successfully');
            toast.success('Campaign created successfully');

            // Reset form data after successful submission
            setFormData({
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                dailyBudget: '',
                totalBudget: '',
                costPerClick: '',
                costPerImpression: '',
                advertiserId: currentUserID,
            });
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
                            <Input type="number" className="shadow-none" name="dailyBudget" value={formData.dailyBudget} onChange={handleChange} disabled />
                        </div>
                        <div>
                            <Label>Total Budget:</Label>
                            <Input type="number" name="totalBudget" value={formData.totalBudget} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cost per click:</Label>
                            <Input type="number" name="costPerClick" value={formData.costPerClick} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cost per Impression:</Label>
                            <Input type="number" name="costPerImpression" value={formData.costPerImpression} onChange={handleChange} />
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
