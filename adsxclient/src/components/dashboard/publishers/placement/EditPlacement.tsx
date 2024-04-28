'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react";


const FormSchema = z.object({
    websiteId: z.string({
        required_error: "Please select a website.",
    })
})

export default function EditPlacement({ placementId }) {
    const [websites, setWebsites] = useState([]);
    const { data: session } = useSession(); 
  const userID = session?.user._id || "";
  const currentUserID = userID; // Set currentUserID to userID

    const [placementData, setPlacementData] = useState({
        name: '',
        description: '',
        width: '',
        height: '',
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        // Fetch placement details when component mounts
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/placement/${placementId}`)
            .then(response => {
                const { websiteId, ...placementData } = response.data;
                setPlacementData(placementData);
                form.setValue("websiteId", websiteId);
            })
            .catch(error => {
                console.error('Error fetching placement:', error);
                toast.error('Failed to fetch placement');
            });

        // Fetch websites when component mounts
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/publisher/${currentUserID}`)
            .then(response => {
                setWebsites(response.data);
            })
            .catch(error => {
                console.error('Error fetching websites:', error);
                toast.error('Failed to fetch websites');
            });
    }, [placementId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlacementData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (data) => {
        // Submit placement data including websiteId
        axios.put(`http://localhost:5001/api/placement/${placementId}`, data)
            .then(response => {
                toast.success('Placement updated successfully');
            })
            .catch(error => {
                console.error('Error updating placement:', error);
                toast.error('Failed to update placement');
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                    Edit Placement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Edit Placement</DialogTitle>
                    <DialogDescription>
                        Make changes to your Placement. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto">
                    <form onSubmit={form.handleSubmit(handleSubmit)} >
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
                                <Select onValueChange={(value) => form.setValue("websiteId", value)} defaultValue={form.getValues().websiteId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a website" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {websites.map(website => (
                                            <SelectItem key={website._id} value={website._id}>
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
