const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    dailyBudget: { type: Number, required: true },
    totalBudget: { type: Number, required: true },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);