const Publisher = require('../models/Publisher');
const Advertiser = require('../models/Advertiser');


exports.createPublisher = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email already exists in the Publisher collection
        const existingPublisher = await Publisher.findOne({ email });

        if (existingPublisher) {
            // If the email already exists in the Publisher collection, send a message to the client
            return res.status(400).json({ message: 'Email already exists. Please use another one.' });
        }

        // Check if the email already exists in the Advertiser collection
        const existingAdvertiser = await Advertiser.findOne({ email });

        if (existingAdvertiser) {
            // If the email already exists in the Advertiser collection, send a message to the client
            return res.status(400).json({ message: 'Email already exists as an advertiser. Please use another one.' });
        }

        // If the email doesn't exist in either collection, create the publisher
        const newPublisher = new Publisher(req.body);
        await newPublisher.save();

        // Send success response with the created publisher
        res.status(201).json(newPublisher);
    } catch (error) {
        // Send error response if something went wrong
        res.status(500).json({ message: 'Failed to create publisher.', error: error.message });
    }
};

exports.getPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.json(publishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.json(publisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.json(publisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.json({ message: 'Publisher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getPublishersByWebsite = async (req, res) => {
    try {
        const publishers = await Publisher.find({ websiteId: req.params.websiteId });
        res.json(publishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublisherStats = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        const placements = await Placement.find({ publisherId: publisher._id });
        const impressions = placements.reduce((acc, placement) => acc + (placement.impressions || 0), 0);
        const clicks = placements.reduce((acc, placement) => acc + (placement.clicks || 0), 0);
        const ctr = (clicks / impressions) * 100 || 0;
        const stats = { impressions, clicks, ctr };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};