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
import { toast } from "sonner";

export default function EditAdvert({ AdvertID }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        creative: '',
        url: '',
        clickUrl: '',
        campaignId: '',
        advertiserId: '',
        ageRange: [],
        gender: [],
        interests: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/aditem/${AdvertID}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching advert details:', error);
            }
        };

        fetchData();
    }, [AdvertID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the name is ageRange, gender, or interests, split the value into an array
        // and update the state accordingly
        if (["ageRange", "gender", "interests"].includes(name)) {
            setFormData({
                ...formData,
                [name]: value.split(',')
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/aditem/${AdvertID}`, formData);
            console.log('Advert details updated successfully');
            toast.success("Advert details updated successfully");
        } catch (error: any) {
            console.error('Error updating advert details:', error);
            toast.error("Error updating Advert details:", error.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                    Edit Advert
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Edit Advert</DialogTitle>
                    <DialogDescription>
                        Make changes to your Advert. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                                <Label>Title:</Label>
                                <Input type="text" name="title" value={formData.title} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Description:</Label>
                                <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Creative:</Label>
                                <Input type="text" name="creative" value={formData.creative} onChange={handleChange} />
                            </div>
                            
                            <div>
                                <Label>Click URL:</Label>
                                <Input type="text" name="clickUrl" value={formData.clickUrl} onChange={handleChange} />
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
                            <DialogFooter className="col-span-2 py-4">
                                <Button type="submit">Save</Button>
                            </DialogFooter>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
