const LoginServices = require('../services/loginServices');

const { HTTP_200_OK } = require('../httpStatusProtocols');

const userLogin = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const loginObj = { email, password };

    const newToken = await LoginServices.userLogin(loginObj);

    if (newToken === 'Invalid fields') {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    return res.status(HTTP_200_OK).json({ newToken });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

module.exports = { userLogin };