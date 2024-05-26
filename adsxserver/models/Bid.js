const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    placementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Placement', required: true },
    views: { type: Number, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', BidSchema);
