'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { data: session } = useSession(); 
    const userID = session?.user._id || '';
    const currentUserID = userID; // Extracting currentUserID from session

    // Fetch notifications from the API
    useEffect(() => {
        const fetchNotifications = () => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/${currentUserID}`)
                .then(response => response.json())
                .then(data => {
                    setNotifications(data);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                });
        };

        fetchNotifications(); // Fetch notifications immediately

        // Set up interval to fetch notifications every 2 seconds
        const intervalId = setInterval(fetchNotifications, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentUserID]); // Include currentUserID in the dependency array

    // Render notification items
    const renderNotifications = () => (
        <div id="notification" className="p-4">
            {notifications.map((notification, index) => (
                <div key={index} className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{notification.notificationType}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    // Conditional rendering based on whether there are notifications or not
    return (
        <div>
            {notifications.length > 0 ? (
                renderNotifications()
            ) : (
                <div className="p-4">
                    <p className="text-xs">There are no notifications</p>
                </div>
            )}
        </div>
    );
}
