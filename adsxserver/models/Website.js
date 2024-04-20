const mongoose = require('mongoose');
const WebsiteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    dateCreated: { type: Date, default: Date.now },
    //target creterias
    ageRange: [String],
    gender: [String],
    interests: [String]
});

module.exports = mongoose.model('Website', WebsiteSchema);