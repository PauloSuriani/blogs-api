const { users } = require('../models');
const UserToken = require('../authentications/JavascriptWebToken');

const userLogin = async ({ email, password }) => {
  const userRequestedBD = await users.findOne({ where: { email } });

  if (!userRequestedBD) {
    const result = 'Invalid fields';
    return (result);
  }

  if (userRequestedBD.password === password) {
    const userToken = UserToken.generateNewToken({ id: users.id });
    return userToken;
  }
};

module.exports = { userLogin };