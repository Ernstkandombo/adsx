const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log incoming data
        console.log("Received data - Email:", email);
        console.log("Received data - Password:", password);

        // Check if user exists in either Advertiser or Publisher collection
        const advertiser = await Advertiser.findOne({ email });
        const publisher = await Publisher.findOne({ email });

        // Log user data if found
        if (advertiser) {
            console.log("User found in Advertiser collection:", advertiser);
        } else if (publisher) {
            console.log("User found in Publisher collection:", publisher);
        } else {
            console.log("User not found.");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Determine user type based on the role field in the models
        let user;
        let userType;
        if (advertiser) {
            user = advertiser;
            userType = advertiser.role; // Assuming role is the field in Advertiser model
        } else if (publisher) {
            user = publisher;
            userType = publisher.role; // Assuming role is the field in Publisher model
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match.");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Log token
        console.log("Generated token:", token);

        // Return token, user type, and user id
        return res.status(200).json({ token, userType, userId: user._id });
    } catch (error) {
        // Log any errors that occur during authentication
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
