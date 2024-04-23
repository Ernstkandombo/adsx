const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');

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

// GET CampaignAssignment by ID
exports.getCampaignAssignmentById = async (req, res) => {
    const { id } = req.params;
    console.log('userID:', id); // Log userID

    try {
        // Find all placements belonging to the publisher with the given userID
        const placements = await Placement.find({ publisherId: id });
        console.log('Placements:', placements);

        // Extract placement IDs
        const placementIds = placements.map(placement => placement._id);
        console.log('Placement IDs:', placementIds);

        // Find campaign assignments with placement IDs matching the found placements
        const campaignAssignments = await CampaignAssignment.find({ placementId: { $in: placementIds } });
        console.log('Campaign Assignments:', campaignAssignments);

        // Prepare an array to store the results
        const results = [];

        // Iterate through each campaign assignment to gather additional information
        for (const assignment of campaignAssignments) {
            // Find the campaign associated with the assignment
            const campaign = await Campaign.findById(assignment.campaignId);
            console.log('Campaign:', campaign);
            // Find the website associated with the campaign
            const placement = await Placement.findById(assignment.placementId);
            console.log('Placement:', Placement);
            // Find the website associated with the campaign
            const website = await Website.findById(assignment.websiteId);
            console.log('Website:', website);

            // Push the relevant information to the results array
            results.push({
                campaignAssignmentID: assignment._id,
                campaignName: campaign.name,
                placementName: placement.name, // Assuming placement name is stored in assignment
                websiteURL: website.url
            });
        }

        // Send the results back as a JSON response
        console.log('Results:', results);
        res.json(results);
    } catch (error) {
        // Handle any errors that might occur
        console.error('Error fetching campaign assignments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// DELETE CampaignAssignment by ID
exports.deleteCampaignAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAssignment = await CampaignAssignment.findByIdAndDelete(id);

        if (!deletedAssignment) {
            return res.status(404).json({ message: 'CampaignAssignment not found' });
        }

        res.status(200).json({ message: 'CampaignAssignment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};