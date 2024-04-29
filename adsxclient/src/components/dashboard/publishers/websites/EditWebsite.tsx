
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export default function EditWebsite({ websiteId }) {
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        category: "",
        views:"",
        ageRange: [],
        gender: [],
        interests: [],
    });

    // Fetch website data based on websiteId when the component mounts
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/${websiteId}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching website data:', error);
            });
    }, [websiteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'ageRange' || name === 'gender' || name === 'interests' ? value.split(',') : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/${websiteId}`, formData)
            .then(response => {
                // Handle success
                console.log('Website updated successfully:', response.data);
                toast.success('Website updated successfully')
            })
            .catch(error => {
                // Handle error
                console.error('Error updating website:', error);
                toast.error('Error updating website:', error)
            });
    };

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
                <div className="overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                                <Label>Name:</Label>
                                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>URL:</Label>
                                <Input type="url" name="url" value={formData.url} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Description:</Label>
                                <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Category:</Label>
                                <Input type="text" name="category" value={formData.category} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Number of Views:</Label>
                                <Input type="number" name="views" value={formData.views} onChange={handleChange} />
                            </div>
                        </div>
                        
                        <div className="grid gap-4">
                            <div className="col-span-2 text-bold py-4">
                                <p>Targeting credentials</p>
                            </div>
                            <div className="col-span-1">
                                <Label>Age Range:</Label>
                                <Input type="text" name="ageRange" value={formData.ageRange.join(',')} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Gender:</Label>
                                <Input type="text" name="gender" value={formData.gender.join(',')} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Interests:</Label>
                                <Input type="text" name="interests" value={formData.interests.join(',')} onChange={handleChange} />
                            </div>
                           
                        </div>
                        
                        <DialogFooter  className="col-span-2 py-6">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
