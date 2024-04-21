'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming toast is used for displaying notifications

export default function DeleteAdvert({ AdvertID }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      // Make axios DELETE request to delete the advertisement
      await axios.delete(`http://localhost:5001/api/aditem/${AdvertID}`);
      console.log('Advert deleted successfully');
      toast.success("Advert deleted successfully");
    } catch (error) {
      console.error('Error deleting advert:', error);
      toast.error("Error deleting advert:", error.message);
    }
    setIsOpen(false); // Close the dialog after deletion
  };

  return (
    <AlertDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
      <AlertDialogTrigger>
        <Button variant="destructive" className="m-1" onClick={() => setIsOpen(true)}>
          Delete Advert
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Advert.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>
            Delete Advert
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
