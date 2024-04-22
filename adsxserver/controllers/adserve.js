const express = require('express');
const router = express.Router();
const CampaignAssignment = require('../models/CampaignAssignment');
const AdItem = require('../models/AdItem');
const Campaign = require('../models/Campaign');
const Placement = require('../models/Placement');

// Get tracking info
exports.getTrackingInfo = async (req, res) => {
    try {
        const campaignAssignmentId = req.query.campaignAssignmentId;
        const adItemId = req.query.adItemId;

        // Get AdItem by ID
        const adItem = await AdItem.findById(adItemId);

        // Get clicks and impressions for AdItem
        adItem.clicks += 1;
        adItem.impressions += 1;
        await adItem.save();

        // Get CampaignAssignment by ID
        const campaignAssignment = await CampaignAssignment.findById(campaignAssignmentId)
            .populate('campaignId')
            .populate('placementId');

        // Get total clicks and impressions for Campaign
        const campaign = await Campaign.findById(campaignAssignment.campaignId._id)
            .populate('adItems');

        let totalClicks = 0;
        let totalImpressions = 0;

        campaign.adItems.forEach(adItem => {
            totalClicks += adItem.clicks;
            totalImpressions += adItem.impressions;
        });

        // Set total clicks and impressions for CampaignAssignment
        campaignAssignment.clicks = totalClicks;
        campaignAssignment.impressions = totalImpressions;
        await campaignAssignment.save();

        res.status(200).json({ success: true, data: campaignAssignment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Ad serve
exports.adServe = async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const campaignAssignmentId = req.params.id; // Update to req.params.id


        console.log("Campaign Assignment ID:", campaignAssignmentId); // Log the campaignAssignmentId

        // Get CampaignAssignment by ID
        const campaignAssignment = await CampaignAssignment.findById(campaignAssignmentId)
            .populate('campaignId')
            .populate('placementId');

        console.log("Campaign Assignment:", campaignAssignment); // Log the campaignAssignment

        // Get AdItems for Campaign
        const adItems = await AdItem.find({ campaignId: campaignAssignment.campaignId })

        console.log("Ad Items:", adItems); // Log the adItems


        // Filter AdItems that match Placement dimensions
        const eligibleAdItems = campaign.adItems.filter(adItem => {
            return adItem.width === campaignAssignment.placementId.width && adItem.height === campaignAssignment.placementId.height;
        });

        console.log("Eligible Ad Items:", eligibleAdItems); // Log the eligibleAdItems

        // Select random AdItem
        const randomAdItem = eligibleAdItems[Math.floor(Math.random() * eligibleAdItems.length)];

        console.log("Random Ad Item:", randomAdItem); // Log the randomAdItem

        // Create embeddingTag
        const embeddingTag = `
        <div>
            <a href="${randomAdItem.clickUrl}" target="_blank">
            <img src="${randomAdItem.creative}" alt="${randomAdItem.title}">
            </a>
        </div>
        `;

        res.status(200).send(embeddingTag);
    } catch (error) {
        console.error("Error in adServe:", error); // Log any errors
        res.status(500).json({ success: false, error: error.message });
    }
};
