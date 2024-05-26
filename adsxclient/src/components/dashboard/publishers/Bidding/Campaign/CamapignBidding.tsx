'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useSession } from "next-auth/react";


export default function BiddingCampaign({ CampaignID }) {
    const [placementOptions, setPlacementOptions] = useState([]);
    const [websiteOptions, setWebsiteOptions] = useState([]);
    const [selectedPlacement, setSelectedPlacement] = useState("");
    const [selectedWebsite, setSelectedWebsite] = useState("");
    const [bidNumber, setBidNumber] = useState(0); // State to store bid number
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

    useEffect(() => {
        const fetchBidNumber = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bid/number/${CampaignID}`);
                if (response.data.bidNumber) {
                    setBidNumber(response.data.bidNumber);
                } else {
                    setBidNumber('Place a bid');
                }
            } catch (error) {
                console.error('Error fetching bid number:', error);

            }
        };
        fetchBidNumber();
    }, [CampaignID]);

    useEffect(() => {
        const fetchPlacement = async () => {
            try {
                const placementResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/placement/publisher/${currentUserID}`);
                setPlacementOptions(placementResponse.data);
            } catch (error) {
                console.error('Error fetching placement options:', error);
            
            }
        };

        fetchPlacement();
    }, [currentUserID]);

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const websiteResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/publisher/${currentUserID}`);
                setWebsiteOptions(websiteResponse.data);
            } catch (error) {
                console.error('Error fetching website options:', error);
             
            }
        };

        fetchWebsites();
    }, [currentUserID]);

    const handleCloseDialog = () => {
        // Close the dialog
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedPlacement || !selectedWebsite) {
            toast.error('Please select both a website and a placement');
            return;
        }

        const formData = {
            campaignId: CampaignID,
            placementId: selectedPlacement,
            websiteId: selectedWebsite,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bid/`, formData);
            toast.success('Campaign bid successful');
            setSelectedPlacement("");
            setSelectedWebsite("");
            setBidNumber(response.data.bidNumber); // Update bid number after successful bid
        } catch (error) {
            console.error('Error bidding campaign:', error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    return (
        <Dialog onClose={handleCloseDialog}>
            <DialogTrigger asChild>
                <Button className="m-1">
                    Bid
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Bid for a Campaign</DialogTitle>
                    <DialogDescription>
                        Try to get the chance to get the campaign.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
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
                    </div>

                    <p>Bid number: {bidNumber}</p> {/* Display bid number */}
                    <DialogFooter className="col-span-2 py-6">
                        <Button type="submit">Bid</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
