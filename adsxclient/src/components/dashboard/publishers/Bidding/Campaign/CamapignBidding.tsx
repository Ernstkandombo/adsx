
'use client'


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function biddingCampaign({ CampaignID }) {
    

    // the logic for the bidding to be send to the backend via the API: axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bid/`);

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
                        <div className="col-span-2 py-4">
                            <Label>Campaign Bidding Assignment Code:</Label>
                            <p className="text-xs py-2">To be used for getting embedding tag: <span className="text-gray-400">save the code somwhere</span></p>
                            <Input type="text" value={campaignIdResponse || ''} disabled />
                        </div>
                    </div>
                    <DialogFooter className="col-span-2 py-6">
                        <Button type="submit" className="px-6">Bid</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
