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

export default function EditAdvert({ AdItemID }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        creative: "",
        creativeurl: "",
        clickUrl: "",
        // Add more fields as needed
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/aditem/${AdItemID}`);
                const { title, description, creative, creativeurl, clickUrl } = response.data;
                setFormData({ title, description, creative, creativeurl, clickUrl });
            } catch (error) {
                console.error("Error fetching advert data:", error);
            }
        };

        fetchData();
    }, [AdItemID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/aditem/${AdItemID}`, formData);
            console.log("Advert updated successfully!");
        } catch (error) {
            console.error("Error updating advert:", error);
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
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 p-4">
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Label>Creative</Label>
                        <Input
                            type="text"
                            name="creative"
                            value={formData.creative}
                            onChange={handleChange}
                        />
                        <Label>Creative URL</Label>
                        <Input
                            type="text"
                            name="creativeurl"
                            value={formData.creativeurl}
                            onChange={handleChange}
                        />
                        <Label>Click URL</Label>
                        <Input
                            type="text"
                            name="clickUrl"
                            value={formData.clickUrl}
                            onChange={handleChange}
                        />
                        {/* Add more fields as needed */}
                    </div>
                    <DialogFooter className="py-6">
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
