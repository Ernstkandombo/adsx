const AdItem = require('../models/AdItem');

exports.createAdItem = async (req, res) => {
    try {
        const adItem = new AdItem(req.body);
        await adItem.save();
        res.status(201).json(adItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAdItems = async (req, res) => {
    try {
        const adItems = await AdItem.find();
        res.json(adItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdItem = async (req, res) => {
    try {
        const adItem = await AdItem.findById(req.params.id);
        if (!adItem) {
            return res.status(404).json({ message: 'Ad Item not found' });
        }
        res.json(adItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdItem = async (req, res) => {
    try {
        const adItem = await AdItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!adItem) {
            return res.status(404).json({ message: 'Ad Item not found' });
        }
        res.json(adItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAdItem = async (req, res) => {
    try {
        const adItem = await AdItem.findByIdAndDelete(req.params.id);
        if (!adItem) {
            return res.status(404).json({ message: 'Ad Item not found' });
        }
        res.json({ message: 'Ad Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

