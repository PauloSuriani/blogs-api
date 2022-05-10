const UserToken = require('../authentications/JavascriptWebToken');

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    UserToken.verifyToken(authorization);
    next();
    } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; 

module.exports = { tokenAuth };