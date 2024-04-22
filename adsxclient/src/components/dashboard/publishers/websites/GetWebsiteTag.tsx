'use client'

import React, { useState, useEffect } from 'react';

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

export default function GetWebsiteTag() {
    const [campaignAssignmentCode, setCampaignAssignmentCode] = useState('');
    const [embeddingTag, setEmbeddingTag] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmbeddingTag = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/adserve/${campaignAssignmentCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch embedding tag');
                }
                const data = await response.json();
                setEmbeddingTag(data);
                setError('');
            } catch (error) {
                setError(error.message);
                setEmbeddingTag(null);
            }
        };

        if (campaignAssignmentCode) {
            fetchEmbeddingTag();
        }
    }, [campaignAssignmentCode]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your form submission logic here
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
                            <div className="col-span-2 py-4">
                                {embeddingTag ? (
                                    <iframe src={embeddingTag.iframeSrc} width="728" height="90" frameborder="0" scrolling="no"></iframe>
                                ) : (
                                    <div>No embedding tag available</div>
                                )}
                            </div>
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
