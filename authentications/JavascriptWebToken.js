const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.SECRET;

const generateNewToken = (data) => 
  jwt.sign(data, JWT_SECRET, {
    expiresIn: '50m',
    algorithm: 'HS256',
});

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
    generateNewToken,
    verifyToken,
};
