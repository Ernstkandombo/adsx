const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');
const Publisher = require('../models/Publisher');
const Notification = require('../models/Notification');
const cron = require('node-cron');


exports.associateCampaignWithPlacement = async (req, res) => {
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
        const { dailyBudget, totalBudget } = campaign;

        // Associate the campaign with the zone through the placement
        const newCampaignAssignment = new CampaignAssignment({
            campaignId,
            placementId,
            websiteId,
            startDate: campaign.startDate,
            endDate: campaign.endDate, // Set the end date to the campaign's end date
            dailyBudget: campaign.dailyBudget,
            totalBudget: campaign.totalBudget,
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

// Store the initial count of CampaignAssignments
let initialAssignmentCount = 0;

exports.getCampaignAssignmentById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find all placements belonging to the publisher with the given userID
        const placements = await Placement.find({ publisherId: id });

        // Extract placement IDs
        const placementIds = placements.map(placement => placement._id);

        // Find campaign assignments with placement IDs matching the found placements
        const campaignAssignments = await CampaignAssignment.find({ placementId: { $in: placementIds } });

        // Get the current count of CampaignAssignments
        const currentAssignmentCount = await CampaignAssignment.countDocuments({ placementId: { $in: placementIds } });

        // If it's the first request, set the initial count
        if (initialAssignmentCount === 0) {
            initialAssignmentCount = currentAssignmentCount;
        }

        // Check if there are new campaign assignments
        if (currentAssignmentCount > initialAssignmentCount) {
            // Send message to the publisher for new campaign assignments
            const newCampaignAssignments = await CampaignAssignment.find({ placementId: { $in: placementIds } }).skip(initialAssignmentCount);
            for (const assignment of newCampaignAssignments) {
                const campaign = await Campaign.findById(assignment.campaignId);
                const placement = await Placement.findById(assignment.placementId);
                const website = await Website.findById(assignment.websiteId);
                const publisher = await Publisher.findById(placement.publisherId);
                const message = `Congratulations! You won the bid for the campaign "${campaign.name}".`;

                // Save the message to the notification collection for the publisher
                const notificationForPublisher = new Notification({
                    message,
                    notificationType: 'Campaign Assignment',
                    userId: publisher._id
                });
                await notificationForPublisher.save();

                // Retrieve the advertiser ID from the campaign
                const advertiserId = campaign.advertiserId;

                // Find the advertiser associated with the campaign
                const advertiser = await Advertiser.findById(advertiserId);

                // Construct a message for the advertiser
                const advertiserMessage = `Your campaign "${campaign.name}" has been assigned to the website "${website.name}".`;

                // Save the message to the notification collection for the advertiser
                const notificationForAdvertiser = new Notification({
                    message: advertiserMessage,
                    notificationType: 'Campaign Assignment',
                    userId: advertiser._id
                });
                await notificationForAdvertiser.save();
            }
            // Update the initial count to the current count
            initialAssignmentCount = currentAssignmentCount;
        }

        // Prepare an array to store the results
        const results = [];

        // Iterate through each campaign assignment to gather additional information
        for (const assignment of campaignAssignments) {
            // Find the campaign associated with the assignment
            const campaign = await Campaign.findById(assignment.campaignId);

            // Find the placement associated with the campaign assignment
            const placement = await Placement.findById(assignment.placementId);

            // Find the website associated with the campaign assignment
            const website = await Website.findById(assignment.websiteId);

            // Push the relevant information to the results array
            results.push({
                campaignAssignmentID: assignment._id,
                campaignName: campaign.name,
                placementName: placement.name,
                websiteURL: website.url
            });
        }

        // Send the results back as a JSON response
        res.json(results);
    } catch (error) {
        // Handle any errors that might occur
        console.error('Error fetching campaign assignments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Find campaign assignments with end date less than or equal to current date
        const expiredAssignments = await CampaignAssignment.find({ endDate: { $lte: new Date() } });

        // Delete expired campaign assignments
        await CampaignAssignment.deleteMany({ endDate: { $lte: new Date() } });

        console.log(`${expiredAssignments.length} expired campaign assignments deleted.`);
    } catch (error) {
        console.error('Error deleting expired campaign assignments:', error);
    }
});

// Mongoose middleware to delete associated CampaignAssignments when a Campaign or Placement is deleted
const deleteAssociatedCampaignAssignments = async function () {
    const campaignId = this._conditions.campaignId;
    const placementId = this._conditions.placementId;

    if (campaignId || placementId) {
        try {
            // If campaignId or placementId is present, delete associated CampaignAssignments
            const conditions = {};
            if (campaignId) conditions.campaignId = campaignId;
            if (placementId) conditions.placementId = placementId;
            await CampaignAssignment.deleteMany(conditions);
        } catch (error) {
            console.error('Error deleting associated CampaignAssignments:', error);
        }
    }
};

// Apply middleware to Campaign and Placement schemas
Campaign.schema.pre('remove', deleteAssociatedCampaignAssignments);
Placement.schema.pre('remove', deleteAssociatedCampaignAssignments);
