const mongoose = require('mongoose');
const WebsiteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
    dateCreated: { type: Date, default: Date.now },
    views: { type: Number, required: true, min: 0 },
    //target creterias
    ageRange: [String],
    gender: [String],
    interests: [String]
});

module.exports = mongoose.model('Website', WebsiteSchema);