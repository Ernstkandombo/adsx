'use client'
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';

export default function DeletePlacement({ placementId }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Send delete request to delete the placement
    axios.delete(`http://localhost:5001/api/placement/${placementId}`)
      .then(response => {
        console.log('Placement deleted successfully:', response.data);
        toast.success('Placement deleted successfully');
        setIsOpen(false);
      })
      .catch(error => {
        console.error('Error deleting placement:', error);
        toast.error('Error deleting placement');
      });
  };

  return (
    <AlertDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
      <AlertDialogTrigger>
        <Button variant="destructive" className="m-1" onClick={() => setIsOpen(true)}>
          Delete Placement
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Placement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>
            Delete Placement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
