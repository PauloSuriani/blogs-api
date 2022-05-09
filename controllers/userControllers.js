const UserServices = require('../services/userServices');

const { HTTP_CREATED } = require('../httpStatusProtocols');

const userRegistration = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const loginObj = { displayName, email, password, image };

    const newToken = await UserServices.userRegistration(loginObj);

    if (newToken === 'email already exists') {
      return res.status(409).json({ message: 'User already registered' });
    }
    return res.status(HTTP_CREATED).json({ newToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegistration };