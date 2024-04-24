import React, { useRef } from 'react';
import axios from 'axios';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

export default function DeleteWebsite({ websiteId }) {
    const cancelRef = useRef(null);

    const handleDelete = () => {
        // Send DELETE request to the server to delete the website
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/websites/${websiteId}`)
            .then(response => {
                // Handle success
                console.log('Website deleted successfully:', response.data);
                toast.success('Website deleted successfully');
                // Close the dialog after deletion
                cancelRef.current.click();
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting website:', error);
                toast.error('Error deleting website');
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive" className="m-1">
                    Delete Website
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Website.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>
                        Delete Website
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
