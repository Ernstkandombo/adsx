const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');

// The publisher is bidding for the highest total budget and higest clicks and impression cost, while the advertiser wants the highest views per Website.
// so the logic should be, the publisher will be this.bidding with the views by providing the website and its Placement, to the bid the the logic take the best of 4 bids.
// note that the bid algorim, should wait at least for bids for it to Selection, the publisher can bid up to 4 times but not with the same websites which they bid already.

// the algorithm should pupolate the CampaignAssignment, with the details from the assigment after the bid is set.




exports.bidding = async (req, res) => {
    try {
        const { websiteId, placementId } = req.body;

        // Retrieve the list of campaigns eligible for bidding
        const eligibleCampaigns = await Campaign.find({ biddable: true }); // Assuming there's a field 'biddable' in the Campaign model

        // Perform the bidding logic to select the best campaigns for the given website and placement
        const selectedCampaigns = []; // Store the selected campaigns here

        // Your bidding logic goes here

        // For example, select campaigns with the highest total budget
        eligibleCampaigns.sort((a, b) => b.totalBudget - a.totalBudget);

        // Select the top 4 campaigns (assuming a maximum of 4 bids per website)
        selectedCampaigns.push(...eligibleCampaigns.slice(0, 4));

        // Create CampaignAssignment documents for the selected campaigns
        const campaignAssignments = await Promise.all(selectedCampaigns.map(async (campaign) => {
            const newCampaignAssignment = new CampaignAssignment({
                campaignId: campaign._id,
                placementId: placementId,
                websiteId: websiteId,
                startDate: campaign.startDate,
                endDate: campaign.endDate,
                dailyBudget: campaign.dailyBudget,
                totalBudget: campaign.totalBudget,
                clicks: 0,
                impressions: 0,
            });
            return await newCampaignAssignment.save();
        }));

        res.status(200).json(campaignAssignments);
    } catch (error) {
        console.error('Error in bidding:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
