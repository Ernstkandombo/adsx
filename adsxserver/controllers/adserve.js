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
        const campaignId = campaignAssignment.campaignId;
        const adItems = await AdItem.find({ campaignId });

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


        adItem.impressions++;
        adItem.clicks++;
        // Sum up clicks and impressions from adItems
        const totalClicks = adItems.reduce((acc, curr) => acc + curr.clicks, 0);
        const totalImpressions = adItems.reduce((acc, curr) => acc + curr.impressions, 0);

        // Update campaignAssignment's clicks and impressions
        campaignAssignment.clicks = totalClicks;
        campaignAssignment.impressions = totalImpressions;


        await Promise.all([campaignAssignment.save(), adItem.save()]);

        res.send(embeddingTag);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
