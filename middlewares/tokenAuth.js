const UserToken = require('../authentications/JavascriptWebToken');

const tokenAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const a = await UserToken.verifyToken(authorization);
    console.log('resultado token verify: ', a);
    next();
    } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; 

module.exports = { tokenAuth };