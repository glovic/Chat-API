const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'ef9fd1cb746f55c24f31a86310f98cdd5b837a6337f45269dd95c86129bd2b31', async (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        // Find the user associated with the token
        const user = await User.findById(decoded.id); // Ensure this matches your JWT payload
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach the user object to the request
        next();
    });
};

module.exports = authenticate;

