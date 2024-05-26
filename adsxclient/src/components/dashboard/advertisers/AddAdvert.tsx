'use client'




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useSession, getSession } from "next-auth/react";

export default function AddAdvert() {
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creative: '',
    clickUrl: '',
    campaignId: '', // This will be set when a campaign is selected
    advertiserId: currentUserID,
    width: 0,
    height: 0,
    impressions: 0,
    clicks: 0,
    ageRange: [],
    gender: [],
    interests: []
  });
  const [campaigns, setCampaigns] = useState([]);
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    // Fetch campaigns when component mounts or when currentUserID changes
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/advertiser/${currentUserID}`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
    const fetchPlacement = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Placement/dimensions/`);
        setPlacements(response.data);
      } catch (error) {
        console.error('Error fetching Placement Size:', error);
      }
    };
    fetchPlacement();
    


  }, [currentUserID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ageRange" || name === "gender" || name === "interests") {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.split(',').map(item => item.trim())
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleCampaignChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      campaignId: value
    }));
  };

  const handlePlacementChange = (value) => {
    // Split the selected value into width and height
    const [width, height] = value.split('x').map(dim => parseInt(dim.trim(), 10));

    // Update formData with width and height
    setFormData(prevData => ({
      ...prevData,
      width: width,
      height: height
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve currentUserID from sessionStorage
            const currentUserID = sessionStorage.getItem('currentUserID');

            // Update formData with currentUserID
            const updatedFormData = {
                ...formData,
                advertiserId: currentUserID
            };

      console.log('Request payload:', formData); 
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aditem/`, updatedFormData);
      console.log('Advert Created successfully');
      toast.success("Advert Created successfully");
      // Reset form data after successful submission
      setFormData({
        title: '',
        description: '',
        creative: '',
        clickUrl: '',
        campaignId: '', // Reset campaignId to empty string
        advertiserId: currentUserID,
        width: 0,
        height: 0,
        impressions: 0,
        clicks: 0,
        ageRange: [],
        gender: [],
        interests: []
      });
    } catch (error) {
      console.error('Error Creating advert: ', error);
      toast.error("Error Creating Advert: ", error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1s gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Advert</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle className="my-2">Add New Advertisement</DialogTitle>
          <DialogDescription>Fill in the details below to add a new Advertisement.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div>
                <Label>Title:</Label>
                <Input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="col-span-2">
                <Label>Description:</Label>
                <Input type="text" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div >
                <Label>Campaigns:</Label>
                <Select onValueChange={handleCampaignChange} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map(campaign => (
                      <SelectItem key={campaign._id} value={campaign._id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="col-span-2 text-bold ">
                <p className="font-semibold">Size:</p>
              </div>
              <div >
                <Select onValueChange={handlePlacementChange} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Placement" />
                  </SelectTrigger>
                  <SelectContent>
                    {placements.map(placement => (
                      <SelectItem key={placement._id} value={`${placement.width}x${placement.height}`}>
                        {`${placement.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="col-span-3 text-bold ">
                <p className="font-semibold">Targeting credentials</p>
              </div>
              <div className="col-span-1">
                <Label>Age Range:</Label>
                <Input type="text" name="ageRange" value={formData.ageRange.join(',')} onChange={handleChange} />
              </div>
              <div className="col-span-1">
                <Label>Gender:</Label>
                <Input type="text" name="gender" value={formData.gender.join(',')} onChange={handleChange} />
              </div>
              <div className="col-span-1">
                <Label>Interests:</Label>
                <Input type="text" name="interests" value={formData.interests.join(',')} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter className="col-span-2 pt-10">
              <Button type="submit">Add Advert</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
