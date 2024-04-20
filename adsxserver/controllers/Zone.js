const Zone = require('../models/Zone');

exports.createZone = async (req, res) => {
    try {
        const zone = new Zone(req.body);
        await zone.save();
        res.status(201).json(zone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.json(zones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getZone = async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id);
        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }
        res.json(zone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }
        res.json(zone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndDelete(req.params.id);
        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }
        res.json({ message: 'Zone deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getZonesByWebsite = async (req, res) => {
    try {
        const zones = await Zone.find({ websiteId: req.params.websiteId });
        res.json(zones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getZoneStats = async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id);
        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }
        const placements = await Placement.find({ zoneId: zone._id });
        const impressions = placements.reduce((acc, placement) => acc + (placement.impressions || 0), 0);
        const clicks = placements.reduce((acc, placement) => acc + (placement.clicks || 0), 0);
        const ctr = (clicks / impressions) * 100 || 0;
        const stats = { impressions, clicks, ctr };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};