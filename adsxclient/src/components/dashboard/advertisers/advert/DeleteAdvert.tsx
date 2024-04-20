import React, { useState } from 'react';
import axios from 'axios';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteAdvert({ AdItemID }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Make API call to delete advert
      const response = await axios.delete(`http://localhost:5001/api/aditem/${AdItemID}`);
      console.log(response.data); // Log the response data
      // Handle success, e.g., show success message
    } catch (error) {
      setError(error.response.data.message); // Set error message
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="m-1">
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Advert'}
          </AlertDialogAction>
        </AlertDialogFooter>
        {error && <div className="text-red-500">{error}</div>}
      </AlertDialogContent>
    </AlertDialog>
  );
}
