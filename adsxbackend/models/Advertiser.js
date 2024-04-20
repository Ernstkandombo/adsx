const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdvertiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556776.jpg' },
    role: { type: String, required: true },
    address: { type: String, default: '' },
    dateCreated: { type: Date, default: Date.now }
});

// Hash the password before saving
AdvertiserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model('Advertiser', AdvertiserSchema);