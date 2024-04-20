const mongoose = require('mongoose');

const CampaignAssignmentSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    placementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Placement', required: true },
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    dailyBudget: { type: Number, required: true },
    totalBudget: { type: Number, required: true },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CampaignAssignment', CampaignAssignmentSchema);