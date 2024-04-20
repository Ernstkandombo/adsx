const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Zone', ZoneSchema);