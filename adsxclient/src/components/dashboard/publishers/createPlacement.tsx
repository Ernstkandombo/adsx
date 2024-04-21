'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function CreatePlacement() {
  const [placementData, setPlacementData] = useState({
    name: "",
    description: "",
    websiteId: "",
    websiteUrl: "",
    width: 0,
    height: 0,
  });
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/websites')
      .then(response => {
        setWebsites(response.data);
      })
      .catch(error => {
        console.error('Error fetching websites:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlacementData({
      ...placementData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract websiteId and websiteUrl from the selected value
    const [websiteId, websiteUrl] = placementData.websiteId.split(',');

    // Update placementData with websiteId and websiteUrl
    setPlacementData(prevData => ({
      ...prevData,
      websiteId,
      websiteUrl
    }));

    axios.post('http://localhost:5001/api/placement', placementData)
      .then(response => {
        console.log('Placement created successfully:', response.data);
        toast.success('Placement created successfully');
      })
      .catch(error => {
        console.error('Error creating placement:', error);
        toast.error('Error creating placement');
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Placement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="my-2">Create New Placement</DialogTitle>
          <DialogDescription>Fill in the details below to create a new Placement.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label>Name:</Label>
                <Input type="text" name="name" value={placementData.name} onChange={handleChange} />
              </div>
              <div>
                <Label>Description:</Label>
                <Input type="text" name="description" value={placementData.description} onChange={handleChange} />
              </div>
              <div className="col-span-2">
                <Label>Website URL:</Label>
                <Select>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select a website" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Websites</SelectLabel>
                      {websites.map(website => (
                        <SelectItem key={website._id} value={`${website._id},${website.url}`}>
                          {website.url}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="py-4 col-span-2">
                <p>Dimensions</p>
              </div>
              <div>
                <Label>Width:</Label>
                <Input type="text" name="width" value={placementData.width} onChange={handleChange} />
              </div>
              <div>
                <Label>Height:</Label>
                <Input type="text" name="height" value={placementData.height} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter className="col-span-2 py-6">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
 