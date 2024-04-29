'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";

export default function CreatePlacement() {

    const { data: session } = useSession(); 
    const userID = session?.user._id || '';
    const currentUserID = userID; // Extracting currentUserID from session

    const [placementData, setPlacementData] = useState({
        name: "",
        description: "",
        websiteId: "",
        websiteUrl: "",
        publisherId: currentUserID,
        width: 0,
        height: 0,
    });
    const [websites, setWebsites] = useState([]);
    const form = useForm();

    useEffect(() => {
        // Fetch websites when component mounts or when currentUserID changes
        const fetchWebsites = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/publisher/${currentUserID}`);
                setWebsites(response.data);
            } catch (error) {
                console.error('Error fetching websites:', error);
            }
        };

        fetchWebsites();

        // Listen for changes in currentUserID and fetch websites again
        window.addEventListener('storage', (event) => {
            if (event.key === 'currentUserID') {
                fetchWebsites();
            }
        });

        return () => {
            window.removeEventListener('storage', () => {});
        };
    }, [currentUserID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlacementData({
            ...placementData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract websiteId and websiteUrl from the selected value
        const [websiteId, websiteUrl] = placementData.websiteId.split(',');

        // Update placementData with websiteId and websiteUrl
        const updatedPlacementData = {
            ...placementData,
            websiteId,
            websiteUrl
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/placement`, updatedPlacementData);
            console.log('Placement created successfully:', response.data);
            toast.success('Placement created successfully');
            setPlacementData({
                name: "",
                description: "",
                websiteId: "",
                websiteUrl: "",
                publisherId: currentUserID,
                width: 0,
                height: 0,
            })
        } catch (error) {
            console.error('Error creating placement:', error);
            toast.error('Error creating placement');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="ml-auto gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Placement</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Create New Placement</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new Placement.</DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                                <Label>Name:</Label>
                                <Input type="text" name="name" value={placementData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Description:</Label>
                                <Input type="text" name="description" value={placementData.description} onChange={handleChange} />
                            </div>
                            <div className="col-span-1">
                                <Label>Website URL:</Label>
                                <Select onValueChange={(value) => setPlacementData(prevData => ({ ...prevData, websiteId: value }))} defaultValue={placementData.websiteId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a website" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {websites.map(website => (
                                            <SelectItem key={website._id} value={`${website._id},${website.url}`}>
                                                {website.url}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="pt-4 col-span-2">
                                <p>Dimensions</p>
                            </div>
                            <div>
                                <Label>Width:</Label>
                                <Input type="text" name="width" value={placementData.width} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Height:</Label>
                                <Input type="text" name="height" value={placementData.height} onChange={handleChange} />
                            </div>
                        </div>
                        <DialogFooter className="col-span-2 py-6">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
