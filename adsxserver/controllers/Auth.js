const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in either Advertiser or Publisher collection
        const advertiser = await Advertiser.findOne({ email });
        const publisher = await Publisher.findOne({ email });

        // Determine user type based on the role field in the models
        let user;
        let userType;
        if (advertiser) {
            user = advertiser;
            userType = advertiser.role; // Assuming role is the field in Advertiser model
        } else if (publisher) {
            user = publisher;
            userType = publisher.role; // Assuming role is the field in Publisher model
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return token, user type, and user id
        return res.status(200).json({ token, userType, userId: user._id });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
