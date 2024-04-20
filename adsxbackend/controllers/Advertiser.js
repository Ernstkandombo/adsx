const Advertiser = require('../models/Advertiser');

exports.createAdvertiser = async (req, res) => {
    try {
        const advertiser = new Advertiser(req.body);
        await advertiser.save();
        res.status(201).json(advertiser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAdvertisers = async (req, res) => {
    try {
        const advertisers = await Advertiser.find();
        res.json(advertisers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdvertiser = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.json(advertiser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdvertiser = async (req, res) => {
    try {
        const advertiser = await Advertiser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.json(advertiser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAdvertiser = async (req, res) => {
    try {
        const advertiser = await Advertiser.findByIdAndDelete(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.json({ message: 'Advertiser deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getAdvertiserStats = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        const campaigns = await Campaign.find({ advertiserId: advertiser._id });
        const impressions = campaigns.reduce((acc, campaign) => acc + (campaign.impressions || 0), 0);
        const clicks = campaigns.reduce((acc, campaign) => acc + (campaign.clicks || 0), 0);
        const ctr = (clicks / impressions) * 100 || 0;
        const stats = { impressions, clicks, ctr };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};