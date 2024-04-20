const CampaignAssignment = require('../models/CampaignAssignment');
const AdItem = require('../models/AdItem');
const Website = require('../models/Website');

exports.adServe = async (req, res) => {
    try {
        const campaignAssignment = await CampaignAssignment.findById(req.params.id);

        console.log("Campaign Assignment:", campaignAssignment);

        if (!campaignAssignment) {
            return res.status(404).send({ error: 'Campaign assignment not found' });
        }

        const adItems = await AdItem.find();

        console.log("Ad Items:", adItems);

        const website = await Website.find({ websiteId: campaignAssignment._id.placementId });

        console.log("Website:", website);

        if (!website) {
            return res.status(404).send({ error: 'Website not found' });
        }


        const randomIndex = Math.floor(Math.random() * adItems.length);
        const adItem = adItems[randomIndex];

        const embeddingTag = `
            <div>
                <a href="${adItem.clickUrl}" target="_blank">
                    <img src="${adItem.creative}" alt="${adItem.title}">
                </a>
            </div>
        `;

        CampaignAssignment.impressions++;
        adItem.impressions++;
        CampaignAssignment.clicks++;
        adItem.impressions++;

        await Promise.all([campaignAssignment.save(), adItem.save()]);

        res.send(embeddingTag);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
