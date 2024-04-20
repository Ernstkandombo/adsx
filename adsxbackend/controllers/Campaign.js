const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getCampaignsByAdvertiser = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ advertiserId: req.params.advertiserId });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCampaignStats = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        const impressions = campaign.impressions || 0;
        const clicks = campaign.clicks || 0;
        const ctr = (clicks / impressions) * 100 || 0;
        const stats = { impressions, clicks, ctr };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};