const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sha256_password';

const generateNewToken = (data) => 
  jwt.sign(data, JWT_SECRET, {
    expiresIn: '50m',
    algorithm: 'HS256',
});

const verifyToken = (token) => 
  jwt.verify(token, JWT_SECRET);

module.exports = {
    generateNewToken,
    verifyToken,
};
