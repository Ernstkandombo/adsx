const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    placementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Placement', required: true },
    views: { type: Number, default: 0 } // Add views field to track views for each bid
});

module.exports = mongoose.model('Bid', BidSchema);
