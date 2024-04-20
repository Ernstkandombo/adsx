const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
    zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Placement', PlacementSchema);