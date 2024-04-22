const Campaign = require('../models/Campaign');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');

exports.getAdvertiserMetrixData = async (req, res) => {
    const { userID } = req.params;

    try {

        const campaigns = await Campaign.find({ advertiserId: userID });


        const campaignIds = campaigns.map(campaign => campaign._id);



        const campaignAssignments = await CampaignAssignment.find({ campaignId: { $in: campaignIds } });


        let totalClicks = 0;
        let totalImpressions = 0;
        campaignAssignments.forEach(assignment => {
            totalClicks += assignment.clicks;
            totalImpressions += assignment.impressions;
        });

        // Calculate total cost
        const clickCost = totalClicks * 2.50;
        const impressionCost = totalImpressions * 1.00;
        const totalCost = clickCost + impressionCost;


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

        // Calculate total clicks and impressions from campaignAssignments
        let totalClicks = 0;
        let totalImpressions = 0;
        campaignAssignments.forEach(assignment => {
            totalClicks += assignment.clicks;
            totalImpressions += assignment.impressions;
        });

        // Calculate total revenue
        const clickRevenue = totalClicks * 2.50;
        const impressionRevenue = totalImpressions * 1.00;
        const totalRevenue = clickRevenue + impressionRevenue;

        // Send the total clicks, impressions, and revenue to the client
        res.json({ totalClicks, totalImpressions, totalRevenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
