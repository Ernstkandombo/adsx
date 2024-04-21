
'use client'


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AssignCampaign({ CampaignID }) {
    const [placementOptions, setPlacementOptions] = useState([]);
    const [websiteOptions, setWebsiteOptions] = useState([]);
    const [selectedPlacement, setSelectedPlacement] = useState("");
    const [selectedWebsite, setSelectedWebsite] = useState("");
    const [campaignIdResponse, setCampaignIdResponse] = useState(null); // State to store campaignId response

    useEffect(() => {
        // Fetch placement options
        axios.get('http://localhost:5001/api/placement')
            .then(response => {
                setPlacementOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching placement options:', error);
            });

        // Fetch website options
        axios.get('http://localhost:5001/api/websites')
            .then(response => {
                setWebsiteOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching website options:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            campaignId: CampaignID,
            placementId: selectedPlacement,
            websiteId: selectedWebsite,
        };
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5001/api/campaignassignment', formData);
            console.log('Campaign assigned successfully:', response.data);
            toast.success('Campaign assigned successfully');
            // Reset form after successful submission
            setSelectedPlacement("");
            setSelectedWebsite("");
            // Set campaignIdResponse state with the received campaignId
            setCampaignIdResponse(response.data.campaignId);
            
           
            toast({
            description:response.data.campaignId,
            position: 'top-center',
        });

        } catch (error) {
            console.error('Error assigning campaign:', error);
            toast.error('Error assigning campaign');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                    Assign Campaign
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Assign Campaign</DialogTitle>
                    <DialogDescription>
                        Make changes to your Campaign. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <Label>Placement:</Label>
                            <Select onValueChange={(value) => setSelectedPlacement(value)} defaultValue={selectedPlacement}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a placement" />
                                </SelectTrigger>
                                <SelectContent>
                                    {placementOptions.map(placement => (
                                        <SelectItem key={placement.id} value={placement._id}>
                                            {placement.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Website:</Label>
                            <Select onValueChange={(value) => setSelectedWebsite(value)} defaultValue={selectedWebsite}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a website" />
                                </SelectTrigger>
                                <SelectContent>
                                    {websiteOptions.map(website => (
                                        <SelectItem key={website.id} value={website._id}>
                                            {website.url}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="col-span-2 py-6">
                        <Button type="submit">Assign</Button>
                    </DialogFooter>
                </form>
                {/* Display campaignIdResponse if it's available */}
                {campaignIdResponse && (
                    <div>
                        <Label>Campaign ID:</Label>
                        <input type="text" value={campaignIdResponse} readOnly />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
