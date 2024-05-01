const Placement = require('../models/Placement');
const Website = require('../models/Website');

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

        const placementsWithUrls = await Promise.all(placements.map(async placement => {
            const website = await Website.findById(placement.websiteId);

            if (website) {
                return {
                    _id: placement._id,
                    name: placement.name,
                    description: placement.description,
                    websiteId: placement.websiteId,
                    publisherId: placement.publisherId,
                    width: placement.width,
                    height: placement.height,
                    dateCreated: placement.dateCreated,
                    websiteUrl: website.url // Added websiteUrl property
                };
            } else {
                return {
                    _id: placement._id,
                    name: placement.name,
                    description: placement.description,
                    websiteId: placement.websiteId,
                    publisherId: placement.publisherId,
                    width: placement.width,
                    height: placement.height,
                    dateCreated: placement.dateCreated,
                    websiteUrl: null // Set websiteUrl to null if website is not found
                };
            }
        }));

        res.json(placementsWithUrls);
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

        const website = await Website.findById(placement.websiteId);

        if (website) {
            const placementWithUrl = {
                _id: placement._id,
                name: placement.name,
                description: placement.description,
                websiteId: placement.websiteId,
                publisherId: placement.publisherId,
                width: placement.width,
                height: placement.height,
                dateCreated: placement.dateCreated,
                websiteUrl: website.url // Added websiteUrl property
            };

            res.json(placementWithUrl);
        } else {
            // If website is not found, return placement without websiteUrl
            res.json({
                _id: placement._id,
                name: placement.name,
                description: placement.description,
                websiteId: placement.websiteId,
                publisherId: placement.publisherId,
                width: placement.width,
                height: placement.height,
                dateCreated: placement.dateCreated,
                websiteUrl: null // Set websiteUrl to null if website is not found
            });
        }
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
        const placements = await Placement.find({ publisherId: req.params.id });

        const placementsWithUrls = await Promise.all(placements.map(async placement => {
            const website = await Website.findById(placement.websiteId);

            return {
                _id: placement._id,
                name: placement.name,
                description: placement.description,
                websiteId: placement.websiteId,
                publisherId: placement.publisherId,
                width: placement.width,
                height: placement.height,
                dateCreated: placement.dateCreated,
                websiteUrl: website ? website.url : null // Set websiteUrl to null if website is not found
            };
        }));

        res.json(placementsWithUrls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getPlacementsSize = async (req, res) => {
    try {
        // Get placements from the Placement collection
        const placements = await Placement.find();

        // Create a Map to store unique placements based on width and height
        const uniquePlacementsMap = new Map();

        // Filter out duplicate placements based on width and height
        placements.forEach(placement => {
            const key = `${placement.width}x${placement.height}`;
            if (!uniquePlacementsMap.has(key)) {
                uniquePlacementsMap.set(key, placement);
            }
        });

        // Format placement dimensions and construct the response
        const formattedPlacements = Array.from(uniquePlacementsMap.values()).map(placement => ({
            name: `Dimensions: ${placement.width}x${placement.height}`,
            width: placement.width,
            height: placement.height
        }));

        // Return formatted placements
        res.json(formattedPlacements);
    } catch (error) {
        // Send error response if something went wrong
        res.status(500).json({ message: 'Failed to fetch placements.', error: error.message });
    }
};




