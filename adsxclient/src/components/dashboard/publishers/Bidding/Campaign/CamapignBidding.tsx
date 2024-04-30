import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function BiddingCampaign({ CampaignID }) {
    const [bidAmount, setBidAmount] = useState(0);

    const handleBid = async (event) => {
        event.preventDefault();
        try {
            // Send bid data to backend
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bid`, {
                campaignId: CampaignID,
                bidAmount: bidAmount
            });
            toast.success("Bid placed successfully");
        } catch (error) {
            console.error('Error placing bid:', error);
            toast.error("Error placing bid:", error.message);
        }
    };

    return (
        <Dialog >
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
                <form onSubmit={handleBid}>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <Label>Bid Amount</Label>
                        <Input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                    </div>
                    <DialogFooter className="col-span-2 py-6">
                        <Button type="submit" className="px-6">Bid</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
