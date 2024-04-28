import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Campaign } from '../campaign/columns';

interface BidComponentProps {
  campaigns: Campaign[];
}

const BidComponent: React.FC<BidComponentProps> = ({ campaigns }) => {
  const [bidAmount, setBidAmount] = useState<number>(0);

  const placeBid = async (campaignId: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bid`, { campaignId, bidAmount });
      toast.success("Bid placed successfully");
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error("Error placing bid:", error.message);
    }
  };

  return (
    <div>
      <h2>Place Bids</h2>
      {campaigns.map(campaign => (
        <div key={campaign._id}>
          <p>{campaign.name}</p>
          <p>{campaign.description}</p>
          <p>Biddable: {campaign.biddable ? 'Yes' : 'No'}</p>
          {campaign.biddable && (
            <>
              <input type="number" value={bidAmount} onChange={e => setBidAmount(parseInt(e.target.value))} />
              <Button onClick={() => placeBid(campaign._id)}>Place Bid</Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BidComponent;