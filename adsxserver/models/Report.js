const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser', required: true },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    dateRange: { type: Object, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);