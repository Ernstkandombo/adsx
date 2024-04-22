const express = require("express");
const CampaignAssignment = require("../models/CampaignAssignment");
const AdItem = require("../models/AdItem");
const Campaign = require("../models/Campaign");
const Placement = require("../models/Placement");
exports.postTrackingInfo = async (req, res) => {
    try {
        const { adItemId, impressions, clicks } = req.body;

        // Update AdItem
        const updatedAdItem = await AdItem.findByIdAndUpdate(adItemId, {
            $inc: { impressions: impressions, clicks: clicks }
        }, { new: true });

        if (!updatedAdItem) {
            return res.status(404).json({ success: false, error: "AdItem not found" });
        }

        // Get the campaign of the updated AdItem
        const adItemCampaign = updatedAdItem.campaignId;

        // Find the CampaignAssignment with the same campaign ID
        const campaignAssignment = await CampaignAssignment.findOne({ campaignId: adItemCampaign });

        if (!campaignAssignment) {
            return res.status(404).json({ success: false, error: "CampaignAssignment not found" });
        }
        // Get all AdItems belonging to the same campaignAssignment
        const campaignAdItems = await AdItem.find({ campaignId: campaignAssignment.campaignId });

        // Get placement dimensions from campaignAssignment
        const placementId = campaignAssignment.placementId;
        const placement = await Placement.findById(placementId);

        // Filter AdItems based on placement dimensions
        const filteredAdItems = campaignAdItems.filter(adItem => {
            return adItem.width === placement.width && adItem.height === placement.height;
        });

        // Calculate total clicks and impressions for the campaign
        let totalClicks = 0;
        let totalImpressions = 0;

        campaignAdItems.forEach(adItem => {
            totalClicks += adItem.clicks;
            totalImpressions += adItem.impressions;
        });

        // Update CampaignAssignment with the new totals
        campaignAssignment.clicks = totalClicks;
        campaignAssignment.impressions = totalImpressions;
        await campaignAssignment.save();

        // Respond with success status and updated CampaignAssignment data
        res.status(200).json({ success: true, data: campaignAssignment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Ad serve
exports.adServe = async (req, res) => {
    try {
        const campaignAssignmentId = req.params.id; // Update to req.params.id

        // Get CampaignAssignment by ID
        const campaignAssignment = await CampaignAssignment.findById(
            campaignAssignmentId
        )
            .populate("campaignId")
            .populate("placementId");

        // Get AdItems for Campaign
        const adItems = await AdItem.find({
            campaignId: campaignAssignment.campaignId,
        });

        // Get Placement by ID
        const placement = await Placement.findById(campaignAssignment.placementId);

        if (!placement) {
            throw new Error("Placement not found.");
        }

        // Filter AdItems that match Placement dimensions
        const eligibleAdItems = adItems.filter((adItem) => {
            return (
                adItem.width === placement.width && adItem.height === placement.height
            );
        });

        // Select random AdItem
        const randomAdItem =
            eligibleAdItems[Math.floor(Math.random() * eligibleAdItems.length)];

        // Create embeddingTag
        const embeddingTag = `
            //advert

            <div id="advert">
                <a id="${randomAdItem._id}" href="${randomAdItem.clickUrl}" target="_blank">
                <img src="${randomAdItem.creative}" alt="${randomAdItem.title}"/>
                </a>
            </div>


            //advert script for tracking

           <script>
    document.addEventListener("DOMContentLoaded", function() {
        const advertDiv = document.getElementById("advert");
        const anchorTag = advertDiv.querySelector("a");
        const adItemId = anchorTag.getAttribute("id");

        let impressions = 0;
        let clicks = 0;

        // Function to record impressions
        function recordImpression() {
            impressions++;
            updateTracking();
        }

        // Function to record clicks
        function recordClick() {
            clicks++;
            updateTracking();
        }

        // Function to update tracking on the server
        function updateTracking() {
            const data = {
                adItemId: adItemId,
                impressions: impressions,
                clicks: clicks
            };

            fetch("http://localhost:5001/api/adserve/tracking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update tracking");
                }
                // Clear impressions and clicks after sending
                impressions = 0;
                clicks = 0;
            })
            .catch(error => {
                console.error("Error updating tracking:", error);
            });
        }

        // Add event listeners for impression and click
        advertDiv.addEventListener("impression", recordImpression);
        anchorTag.addEventListener("click", recordClick);

        // Initial impression recording
        recordImpression();
    });
</script>


    `;

        res.set("Content-Type", "text/plain"); // Set content type to plain text
        res.status(200).send(embeddingTag); // Send embeddingTag as text
    } catch (error) {
        console.error("Error in adServe:", error); // Log any errors
        res.status(500).json({ success: false, error: error.message });
    }
};
