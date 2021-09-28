const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const { AuthenticationError } = require('apollo-server');

module.exports = async (context) => {
    const authHeader = context.req.headers.authorization;
    
    if (authHeader && authHeader !== '') {
        // Bearer token
        const token = authHeader.split('Bearer ')[1];
        
        if (token){
            var currentUser = null;
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
                currentUser = await User.findById(user.id);
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
            if (!currentUser) {
                throw new AuthenticationError('User not found');
            }
            if (!currentUser.isActive) {
                throw new AuthenticationError('User is not active');
            } 
            return currentUser;
        } else {
            throw new Error('Authentication token must be \'Bearer\' [token]');
        }
    } else {
        throw new Error('Authorization header must be provided');
    }
}