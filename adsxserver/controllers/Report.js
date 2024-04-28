const Campaign = require('../models/Campaign');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const AdItem = require('../models/AdItem');

exports.getAdvertiserMetrixData = async (req, res) => {
    const { userID } = req.params;

    try {
        // Fetch all campaigns associated with the provided userID
        const campaigns = await Campaign.find({ advertiserId: userID });

        // Initialize variables to store total clicks, impressions, and cost
        let totalClicks = 0;
        let totalImpressions = 0;
        let totalCost = 0;

        // Iterate over each campaign
        for (const campaign of campaigns) {
            // Find all AdItems associated with the campaign
            const adItems = await AdItem.find({ campaignId: campaign._id });

            // Calculate total clicks and impressions for this campaign
            const campaignClicks = adItems.reduce((acc, item) => acc + item.clicks, 0);
            const campaignImpressions = adItems.reduce((acc, item) => acc + item.impressions, 0);

            // Update total clicks and impressions
            totalClicks += campaignClicks;
            totalImpressions += campaignImpressions;

            // Calculate campaign cost
            const clickCost = campaignClicks * campaign.costPerClick;
            const impressionCost = campaignImpressions * campaign.costPerImpression;

            // Update total cost
            totalCost += clickCost + impressionCost;
        }

        // Send the response with calculated metrics
        res.json({ totalClicks, totalImpressions, totalCost });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};











exports.getPublisherMetrixData = async (req, res) => {
    const { userID } = req.params;

    try {
        // Find all placements with the given userID (publisherId)
        const placements = await Placement.find({ publisherId: userID });

        // Get placementIds from the found placements
        const placementIds = placements.map(placement => placement._id);

        // Find all campaignAssignments with placementIds matching the found placements
        const campaignAssignments = await CampaignAssignment.find({ placementId: { $in: placementIds } });

        // Get campaignIds from the found campaignAssignments
        const campaignIds = campaignAssignments.map(assignment => assignment.campaignId);

        // Find all campaigns with campaignIds matching the found campaignAssignments
        const campaigns = await Campaign.find({ _id: { $in: campaignIds } });

        // Calculate total clicks, impressions, and revenue
        let totalClicks = 0;
        let totalImpressions = 0;
        let totalRevenue = 0;
        campaigns.forEach(campaign => {
            campaignAssignments.forEach(assignment => {
                if (assignment.campaignId.equals(campaign._id)) {
                    totalClicks += assignment.clicks;
                    totalImpressions += assignment.impressions;
                    const clickRevenue = assignment.clicks * campaign.costPerClick;
                    const impressionRevenue = assignment.impressions * campaign.costPerImpression;
                    totalRevenue += clickRevenue + impressionRevenue;
                }
            });
        });

        // Send the total clicks, impressions, and revenue to the client
        res.json({ totalClicks, totalImpressions, totalRevenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.getCampaignMetrics = async (req, res) => {
    try {
        const campaignId = req.params.campaignId; // Assuming campaignId is passed in the request params

        // Find the campaign to get additional details
        const campaign = await Campaign.findById(campaignId);

        // Find all AdItems with the given campaignId
        const adItems = await AdItem.find({ campaignId });

        // Calculate total clicks, impressions, and cost
        let totalClicks = 0;
        let totalImpressions = 0;
        let totalCost = 0;

        for (const adItem of adItems) {
            totalClicks += adItem.clicks;
            totalImpressions += adItem.impressions;
            totalCost += (adItem.clicks * campaign.costPerClick) + (adItem.impressions * campaign.costPerImpression);
        }

        // Construct the response object
        const metrics = {
            clicks: totalClicks,
            impressions: totalImpressions,
            campaignName: campaign.name,
            endDate: campaign.endDate,
            costPerClick: campaign.costPerClick,
            costPerImpression: campaign.costPerImpression,
            cost: totalCost,
            adItems: adItems.map(adItem => ({
                name: adItem.title,
                clicks: adItem.clicks,
                impressions: adItem.impressions
            }))
        };

        // Return the metrics
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};