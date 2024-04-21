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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export default function EditPlacement({ placementId }) {
    const [placementData, setPlacementData] = useState({
        name: "",
        description: "",
        websiteId: "",
        websiteUrl: "", // Added websiteUrl state
        publisherId: "",
        width: 0,
        height: 0,
    });
    const [websites, setWebsites] = React.useState([]);
    const [selectedWebsite, setSelectedWebsite] = React.useState({
        _id: "",
        url: "",
    });



    // Fetch placement data and list of websites based on placementId when the component mounts
    useEffect(() => {
        axios.all([
            axios.get(`http://localhost:5001/api/placement/${placementId}`),
            axios.get('http://localhost:5001/api/websites')
        ])
            .then(axios.spread((placementResponse, websitesResponse) => {
                setPlacementData(placementResponse.data);
                setWebsites(websitesResponse.data);
            }))
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, [placementId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlacementData({
            ...placementData,
            [name]: value,
        });
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        const website = websites.find(site => site._id === value);
        setSelectedWebsite(website);
    };
    
    
  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract websiteId and websiteUrl from the selected value
    const [websiteId, websiteUrl] = placementData.websiteId.split(',');

    // Update placementData with websiteId and websiteUrl
    setPlacementData(prevData => ({
        ...prevData,
        websiteId,
        websiteUrl: websiteUrl 
    }));
    
    axios.put(`http://localhost:5001/api/placement/${placementId}`, placementData)
        .then(response => {
            // Handle success
            console.log('Placement updated successfully:', response.data);
            toast.success('Placement updated successfully');
        })
        .catch(error => {
            // Handle error
            console.error('Error updating placement:', error);
            toast.error('Error updating placement');
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
                            <div className="col-span-2">
                                <Label>Website URL:</Label>
                                <Select>
                                    <SelectTrigger className="w-1/2">
                                        <SelectValue placeholder="Select a website" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Websites</SelectLabel>
                                            {websites.map(website => (
                                                <SelectItem key={website._id} value={`${website._id},${website.url}`}>
                                                    {website.url}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="py-4 col-span-2">
                                <p>Diamensions</p>
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
