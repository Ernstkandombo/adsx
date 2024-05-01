'use client'



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function EditAdvert({ AdvertID }) {
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
    campaignId: '',
    advertiserId: currentUserID,
    height: 0,
    width: 0,
    impressions: 0,
    clicks: 0,
    ageRange: [],
    gender: [],
    interests: []
  });
  const [campaigns, setCampaigns] = useState([]);
 const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aditem/${AdvertID}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching adverts details:', error);
      }
    };

    fetchData();
  }, [AdvertID]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/advertiser/${currentUserID}`)
      .then(response => {
        setCampaigns(response.data);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }, []);


useEffect(() => {

    const fetchPlacement = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Placement/dimensions/`);
        setPlacements(response.data);
      } catch (error) {
        console.error('Error fetching Placement Size:', error);
      }
    };
    fetchPlacement();
  }, []);

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
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aditem/${AdvertID}`, formData);
      console.log('Advert details updated successfully');
      toast.success("Advert details updated successfully");
    } catch (error) {
      console.error('Error updating Advert details:', error);
      toast.error("Error updating Advert details:", error.message);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="m-1">
          Edit Advert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle className="my-2">Edit Advert</DialogTitle>
          <DialogDescription>
            Make changes to your Advert. Click save when you're done.
          </DialogDescription>
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
              <div  className="col-span-1">
                <Label>Gender:</Label>
                <Input type="text" name="gender" value={formData.gender.join(',')} onChange={handleChange} />
              </div>
              <div  className="col-span-1">
                <Label>Interests:</Label>
                <Input type="text" name="interests" value={formData.interests.join(',')} onChange={handleChange} />
              </div>
              
            </div>
            <DialogFooter className="col-span-2 pt-10">
                <Button type="submit">Edit Advert</Button>
              </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
