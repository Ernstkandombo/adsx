import React from 'react'
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ReportButton() {
 const { data: session } = useSession(); 
  const userID = session?.user._id || {};
  const currentUserID = userID; // Extracting currentUserID from session




  return (
      <div>
          <Button className="mx-4">
              <FileDown className="h-6 w-6 px-1 text-amber-500" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export Report</span>
              </Button>
    </div>
  )
}
