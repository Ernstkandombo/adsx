import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

export default function ViewCampaignMetrix({ CampaignID }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/campaigns/${CampaignID}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };

    fetchData();
  }, [CampaignID]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="m-1">
          View Campaign data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[950px]">
        {formData && (
          <>
            <DialogHeader>
              <DialogTitle className="my-2">View Campaign Data</DialogTitle>
              <DialogDescription>
                See all the Data for the campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 px-2">
              <div className="grid grid-cols-2 grid-rows-1 gap-4 py-4">
                <h5 className="font-bold">{formData.campaignName}</h5>
                <p className=" text-sm">End Date: <span className="font-semibold text-sm">{new Date(formData.endDate).toLocaleDateString()}</span></p>
              </div>
              <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <div >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription className="font-semibold">Clicks</CardDescription>
                      <CardTitle className="text-2xl">{formData.clicks}</CardTitle>
                    </CardHeader>
                  </Card>
                  <p className="text-xs p-2" >Cost per Click <span className="font-semibold">N$ {formData.costPerClick}</span></p>
                </div>
                <div >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription className="font-semibold">Impressions</CardDescription>
                      <CardTitle className="text-2xl">{formData.impressions}</CardTitle>
                    </CardHeader>
                  </Card>
                  <p className="text-xs p-2">Cost per Impression <span className="font-semibold">N$ {formData.costPerImpression}</span></p>
                </div>
                <div >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription className="font-semibold">Total Cost</CardDescription>
                      <CardTitle className="text-2xl">N$ {formData.cost}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 grid-rows-1 gap-4 py-6">
                <div className="rounded border shadow py-4 px-2 overflow-y-auto	h-40">
                  {formData.adItems.map((adItem, index) => (
                    <Badge key={index} variant="outline" className="p-2 m-2">{adItem.name}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
