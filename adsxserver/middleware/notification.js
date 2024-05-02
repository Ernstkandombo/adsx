// Import necessary models
const Campaign = require('./models/Campaign');
const Placement = require('./models/Placement');
const Website = require('./models/Website');
const Publisher = require('./models/Publisher');
const Notification = require('./models/Notification');
const CampaignAssignment = require('./models/CampaignAssignment');

// Define Mongoose middleware for CampaignAssignment model
CampaignAssignment.schema.post('save', async function (doc) {
    try {
        // Retrieve the newly saved document
        const assignment = await CampaignAssignment.findById(doc._id)
            .populate('campaignId')
            .populate('placementId')
            .populate('websiteId');

        // Ensure assignment, campaign, placement, and website exist
        if (!assignment || !assignment.campaignId || !assignment.placementId || !assignment.websiteId) {
            console.error('Assignment, campaign, placement, or website not found:', assignment);
            return;
        }

        const campaign = assignment.campaignId;
        const placement = assignment.placementId;
        const website = assignment.websiteId;

        const publisher = await Publisher.findById(placement.publisherId);

        // Ensure publisher exists
        if (!publisher) {
            console.error('Publisher not found for placement:', placement);
            return;
        }

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

        // Ensure advertiser exists
        if (!advertiser) {
            console.error('Advertiser not found for campaign:', campaign);
            return;
        }

        // Construct a message for the advertiser
        const advertiserMessage = `Your campaign "${campaign.name}" has been assigned to the website "${website.name}".`;

        // Save the message to the notification collection for the advertiser
        const notificationForAdvertiser = new Notification({
            message: advertiserMessage,
            notificationType: 'Campaign Assignment',
            userId: advertiser._id
        });
        await notificationForAdvertiser.save();
    } catch (error) {
        console.error('Error in campaignAssignment save middleware:', error);
    }
});
