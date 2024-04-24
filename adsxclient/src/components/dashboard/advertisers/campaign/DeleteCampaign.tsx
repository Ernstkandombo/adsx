import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from "sonner";

export default function DeleteCampaign({ CampaignID }) {
    const handleDelete = async () => {
        try {
            // Send a delete request to the server
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/${CampaignID}`);
            console.log('Campaign deleted successfully');
            toast.success("Campaign deleted successfully");
        } catch (error) {
            console.error('Error deleting campaign:', error);
            toast.error("Error deleting campaign:", error.message);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive" className="m-1">
                    Delete Campaign
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Campaign.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>
                        Delete Campaign
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
