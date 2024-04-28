const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdvertiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556787.jpg?t=st=1714195874~exp=1714199474~hmac=c1f0bfff7ce36b36e11c7f3f8dee8b6e24e25c60169f899fb179f590af5cfae5&w=826' },
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