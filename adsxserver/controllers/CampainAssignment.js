const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Website = require('../models/Website');
const Campaign = require('../models/Campaign'); // Add this line to import the Campaign model

exports.associateCampaignWithZone = async (req, res) => {
    try {
        const { campaignId, websiteId, placementId } = req.body;


        // Fetch the campaign, placement, and website based on their IDs
        const campaign = await Campaign.findById(campaignId);
        const placement = await Placement.findById(placementId);
        const website = await Website.findById(websiteId);

        // Check if the campaign, placement, and website exist
        if (!campaign || !placement || !website) {
            return res.status(404).json({ message: 'Campaign, Placement, or Website not found' });
        }

        // Extract dailyBudget and totalBudget from the campaign
        const { dailyBudget, totalBudget, endDate } = campaign;

        // Associate the campaign with the zone through the placement
        const newCampaignAssignment = new CampaignAssignment({
            campaignId,
            placementId,
            websiteId,
            startDate: new Date(),
            endDate, // Set the end date to the campaign's end date
            dailyBudget,
            totalBudget,
            clicks: 0,
            impressions: 0,
        });

        // Save the new campaign assignment to the database
        const savedCampaignAssignment = await newCampaignAssignment.save();

        res.status(201).json(savedCampaignAssignment);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};