import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EditCampaign({ CampaignID }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        dailyBudget: '',
        costPerClick: '',
        costPerImpression: '',
        totalBudget: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/${CampaignID}`);
                setFormData(response.data);
                calculateDailyBudget(response.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        };

        fetchData();
    }, [CampaignID]);

    const calculateDailyBudget = (data) => {
        const { startDate, endDate, totalBudget } = data;
        const totalBudgetFloat = parseFloat(totalBudget);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const durationInDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
        const dailyBudget = (totalBudgetFloat / durationInDays).toFixed(2);
        setFormData(prevState => ({
            ...prevState,
            dailyBudget: dailyBudget,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'startDate' || name === 'endDate' || name === 'totalBudget') {
            calculateDailyBudget({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/${CampaignID}`, formData);
            console.log('Campaign details updated successfully');
            toast.success("Campaign details updated successfully");
        } catch (error) {
            console.error('Error updating campaign details:', error);
            toast.error("Error updating campaign details:", error.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="m-1">
                    Edit Campaign
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle className="my-2">Edit Campaign</DialogTitle>
                    <DialogDescription>
                        Make changes to your Campaign. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <Label>Name:</Label>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Description:</Label>
                            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Start Date:</Label>
                            <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>End Date:</Label>
                            <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Daily Budget:</Label>
                            <Input type="number" className="shadow-none" name="dailyBudget" value={formData.dailyBudget} onChange={handleChange} disabled/>
                        </div>
                        <div>
                            <Label>Total Budget:</Label>
                            <Input type="number" name="totalBudget" value={formData.totalBudget} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cost per click:</Label>
                            <Input type="number" name="costPerClick" value={formData.costPerClick} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cost per Impression:</Label>
                            <Input type="number" name="costPerImpression" value={formData.costPerImpression} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter className="py-8">
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
