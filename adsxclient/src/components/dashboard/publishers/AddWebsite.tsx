'use client'
import React, { useState } from 'react';
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

export default function AddWebsite() {
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        category: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5001/api/websites`, formData)
            .then(response => {
                // Handle success
                console.log('Website added successfully:', response.data);
                toast.success('Website added successfully');
            })
            .catch(error => {
                // Handle error
                console.error('Error adding website:', error);
                toast.error('Error adding website');
            });
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
