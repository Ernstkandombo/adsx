'use client'


import React, { useState } from 'react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
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
import { Textarea } from "@/components/ui/textarea";

export default function GetWebsiteTag() {
    const [campaignAssignmentCode, setCampaignAssignmentCode] = useState("");
    const [embeddingTag, setEmbeddingTag] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5001/api/adserve/${campaignAssignmentCode}`);
            console.log('Embedding tag received:', response.data);
            const sanitizedEmbeddingTag = sanitizeHtml(response.data);
            setEmbeddingTag(sanitizedEmbeddingTag);
            setError(null); // Reset error state
        } catch (error) {
            console.error('Error fetching embedding tag:', error);
            setError('Error fetching embedding tag. Please check the campaign assignment code.');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-1">
                    Get Website Tag
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Get Website Tag</DialogTitle>
                    <DialogDescription>
                        Get Website Tag For Your Specific Zone.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="col-span-2 py-4">
                        <Label>Campaign Assignment Code:</Label>
                        <p className="text-xs py-2">Enter to get embedding tag:</p>
                        <Input type="text" value={campaignAssignmentCode} onChange={(e) => setCampaignAssignmentCode(e.target.value)} />
                    </div>
                    <div className="col-span-2 py-4">
                        <Label>Embedding Tag:</Label>
                        <p className="text-xs py-2">Just copy and paste, in your website.</p>
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="col-span-2 py-4" dangerouslySetInnerHTML={{ __html: embeddingTag }}></div>
                        )}
                    </div>
                    <DialogFooter className="col-span-2 py-6">
                        <Button type="submit">Get Tag</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
