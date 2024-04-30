const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');
const Bid = require('../models/Bid');

// Objective Clarity: The publisher aims for the highest total budget, clicks, and impression cost in the campaign, whereas the advertiser seeks the highest views per website.

//     Publisher's Bid Process:
// The publisher bids based on the views of the website, providing the website and its placement.
// Each bid consists of the campaign being bid for, the websites and their placements, and the publisher's information.

// Bid temporary collection:
// Each bid contains data on the campaign, the website, and the placement and the publisher.

// Bid Selection:
// The bid logic selects the best of four bids for the campaign.
// These bids are stored temporarily in a collection named "bid".
// the algorithm chooses the winning bid from the temporary bid collection.
// The website with the highest views wins the campaign.
// The data from the winning bid is used to create a new "CampaignAssignment" collection.

// Bid Waiting Period:
// The bid algorithm waits for at least four bids before making a selection.
// The publisher can bid up to four times but cannot bid with the same websites they've already bid on.
// Four bids are placed per campaign before the algorithm chooses the winning bid from the temporary bid collection.



// Bid Requirements:
// When placing a bid, the campaign ID, website ID, and placement ID are required.

// every time a request i sent for the same campaign it one bid for that campaign and each campaign need 4 bids, before choosing the wing bid.


exports.bidding = async (req, res) => {
    try {

        const { campaignId, websiteId, placementId } = req.body;
        // Validate bid data
        if (!campaignId || !websiteId || !placementId) {
            console.error('Missing required fields in bid request:', req.body);
            return res.status(400).json({ message: 'Campaign ID, website ID, and placement ID are required.' });
        }

        // Check if the campaign exists
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            console.error('Campaign not found. Campaign ID:', campaignId);
            return res.status(404).json({ message: 'Campaign not found.' });
        }

        // Check if the website has already been used in previous bids for this campaign
        const existingBid = await Bid.findOne({ campaignId, websiteId });
        if (existingBid) {
            console.error('Website already used in a previous bid for this campaign. Campaign ID:', campaignId, 'Website ID:', websiteId);
            return res.status(400).json({ message: 'The website can only be used once per campaign bid.' });
        }
        // Fetch views from the website
        const website = await Website.findById(websiteId);
        if (!website) {
            console.error('Website not found. Website ID:', websiteId);
            return res.status(404).json({ message: 'Website not found.' });
        }
        const views = website.views; // Get views from the website
        // Create and save the bid with views
        const bid = new Bid({ campaignId, websiteId, placementId, views }); // Include views in the bid
        await bid.save();


        // Increment bidNumber or perform actions when bidNumber reaches 4
        // Example:
        const bidNumber = await Bid.countDocuments({ campaignId });
        if (bidNumber === 4) {
            // Your actions when bidNumber reaches 4
            // Find the winning bid for the campaign based on highest views per website
            const winningBid = await Bid.findOne({ campaignId }).sort({ views: -1 });
            if (!winningBid) {
                console.error('No winning bid found for this campaign. Campaign ID:', campaignId);
                return res.status(404).json({ message: 'No bids found for this campaign.' });
            }

            // Create campaign assignment using winning bid data
            const campaignAssignment = new CampaignAssignment({
                campaignId: winningBid.campaignId,
                websiteId: winningBid.websiteId,
                placementId: winningBid.placementId,
                startDate: new Date(),
                endDate: new Date(), // You should set the end date based on campaign duration
                dailyBudget: campaign.dailyBudget,
                totalBudget: campaign.totalBudget,
                clicks: 0,
                impressions: 0
            });
            await campaignAssignment.save();

            // Remove all bids for this campaign
            await Bid.deleteMany({ campaignId });

            return res.status(201).json({ bid: winningBid, bidNumber: 1 }); // Since only one bid is selected
        }


        return res.status(201).json({ bid, bidNumber });
    } catch (error) {
        console.error('Error in bidding:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
