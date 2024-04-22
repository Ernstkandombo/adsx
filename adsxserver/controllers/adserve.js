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

        const iframeSrc = `/tracking?campaignId=${campaignAssignment._id}&adItemId=${adItem._id}`;

        const iframeTag = `
            <iframe src="${iframeSrc}" width="728" height="90" frameborder="0" scrolling="no"></iframe>
        `;

        res.send(iframeTag);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
