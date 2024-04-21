'use client'
import React, { useState } from 'react'; // Import React and useState
import axios from 'axios'; // Import axios for making HTTP requests
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
import { toast } from "sonner";

export default function AddAdvert() {
  const [formData, setFormData] = useState({ // Initialize formData state
    title: '',
    description: '',
    creative: '',
    clickUrl: '',
    campaignId: "6623822657a0a0a874b17bbf", 
    advertiserId: "6623830857a0a0a874b17bc5", 
    impressions: 0,
    clicks: 0, 
    ageRange: [],
    gender: [],
    interests: []
  });

  const handleChange = (e) => { // Define handleChange function
    const { name, value } = e.target;
    if (name === "ageRange" || name === "gender" || name === "interests") {
      // If the field is ageRange, gender, or interests, split the string value into an array
      setFormData(prevState => ({
        ...prevState,
        [name]: value.split(',').map(item => item.trim()) // Split the string by comma and trim whitespace
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => { // Define handleSubmit function as async
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5001/api/adItem/`, formData); // Make axios PUT request
      console.log('Advert details updated successfully');
      toast.success("Advert details updated successfully");
    } catch (error : any) {
      console.error('Error updating advert details:', error);
      toast.error("Error updating Advert details:", error.message);
    }
    // Reset form data after submission
    setFormData({
      title: '',
    description: '',
    creative: '',
    clickUrl: '',
    campaignId: "6623822657a0a0a874b17bbf", 
    advertiserId: "6623830857a0a0a874b17bc5", 
    impressions: 0,
    clicks: 0, 
    ageRange: [],
    gender: [],
    interests: []
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1s gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Advert</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="my-2">Add New Advertisement</DialogTitle>
          <DialogDescription>Fill in the details below to add a new Advertisement.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label>Title:</Label>
                <Input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div>
                <Label>Description:</Label>
                <Input type="text" name="description" value={formData.description} onChange={handleChange} />
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
            <div className="grid gap-4">
              <div className="col-span-2 text-bold py-4">
                <p>Targeting credentials</p>
              </div>
              <div className="col-span-1">
                <Label>Age Range:</Label>
                <Input type="text" name="ageRange" value={formData.ageRange.join(',')} onChange={handleChange} />
              </div>
              <div>
                <Label>Gender:</Label>
                <Input type="text" name="gender" value={formData.gender.join(',')} onChange={handleChange} />
              </div>
              <div>
                <Label>Interests:</Label>
                <Input type="text" name="interests" value={formData.interests.join(',')} onChange={handleChange} />
              </div>
              <DialogFooter className="col-span-2 py-4">
                <Button type="submit">Add Advert</Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
