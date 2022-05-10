const UserServices = require('../services/userServices');

const { HTTP_CREATED, HTTP_200_OK } = require('../httpStatusProtocols');

const userRegistration = async (req, res, _next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const loginObj = { displayName, email, password, image };

    const newToken = await UserServices.userRegistration(loginObj);

    if (newToken === 'email already exists') {
      return res.status(409).json({ message: 'User already registered' });
    }
    return res.status(HTTP_CREATED).json({ newToken });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

const getUsers = async (_req, res, _next) => {
    const allUsers = await UserServices.getUsers();
    return res.status(HTTP_200_OK).json(allUsers);
};

module.exports = { userRegistration, getUsers };