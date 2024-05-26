const bcrypt = require('bcryptjs');
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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Create a sanitized user object without the password
        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: userType,
            avatar: user.avatar
        };

        // Return token and sanitized user data
        return res.status(200).json({ token, user: sanitizedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
