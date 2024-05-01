'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Import toast from Sonner
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Import Label component
import { Input } from '@/components/ui/input'; // Import Input component
import { useSession } from "next-auth/react";



export default function AddWebsite() {

    const { data: session, status } = useSession(); 
    const [currentUserID, setCurrentUserID] = useState("");

    useEffect(() => {
        // Update currentUserID when session changes
        if (status === "authenticated") {
        setCurrentUserID(session.user._id);
        }
    }, [session, status]);

    useEffect(() => {
        // Save currentUserID to sessionStorage
        sessionStorage.setItem('currentUserID', currentUserID);
    }, [currentUserID]);
        
    
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        category: "",
        publisherId: currentUserID,
        views:"",
        ageRange: [],
        gender: [],
        interests: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'ageRange' || name === 'gender' || name === 'interests' ? value.split(',') : value,
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Retrieve currentUserID from sessionStorage
        const currentUserID = sessionStorage.getItem('currentUserID');

        // Update formData with currentUserID
        const updatedFormData = {
            ...formData,
            publisherId: currentUserID
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites`, updatedFormData);
        // Handle success
        console.log('Website added successfully:', response.data);
        toast.success('Website added successfully');

        // Reset form data after successful submission
        setFormData({
            name: "",
            url: "",
            description: "",
            category: "",
            publisherId: currentUserID,
            views: "",
            ageRange: [],
            gender: [],
            interests: [],
        });
    } catch (error) {
        // Handle error
        console.error('Error adding website:', error);
        toast.error('Error adding website');
    }
};



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

                        <DialogFooter className="col-span-2 py-6">
                            <Button type="submit">Add Website</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
