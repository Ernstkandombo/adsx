const Placement = require('../models/Placement');

exports.createPlacement = async (req, res) => {
    try {
        const placement = new Placement(req.body);
        await placement.save();
        res.status(201).json(placement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlacement = async (req, res) => {
    try {
        const placement = await Placement.findById(req.params.id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json(placement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePlacement = async (req, res) => {
    try {
        const placement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json(placement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePlacement = async (req, res) => {
    try {
        const placement = await Placement.findByIdAndDelete(req.params.id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json({ message: 'Placement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getPlacementsByPublisher = async (req, res) => {
    try {
        const placements = await Placement.find({ publisherId: req.params.publisherId });
        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlacementStats = async (req, res) => {
    try {
        const placement = await Placement.findById(req.params.id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        const impressions = placement.impressions || 0;
        const clicks = placement.clicks || 0;
        const ctr = (clicks / impressions) * 100 || 0;
        const stats = { impressions, clicks, ctr };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};