const { users } = require('../models');
const UserToken = require('../authentications/JavascriptWebToken');

const userRegistration = async ({ displayName, email, password, image }) => {
  const userRequestedBD = await users.findOne({ where: { email } });

  if (userRequestedBD) {
    const result = 'email already exists';
    return (result);
  }

  const newTokens = UserToken.generateNewToken({ id: users.id });
  const createdUser = await users.create({ displayName, email, password, image });

  if (createdUser) return newTokens;

  throw new Error(400, 'Invalid fields');
};

module.exports = { userRegistration };