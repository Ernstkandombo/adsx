const mongoose = require('mongoose');

const AdItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creative: { type: String, required: true },
    clickUrl: { type: String, required: true },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser', required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    //target creterias
    ageRange: [String],
    gender: [String],
    interests: [String]
});

module.exports = mongoose.model('AdItem', AdItemSchema);
