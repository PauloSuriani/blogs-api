const { Users } = require('../models');
const UserToken = require('../authentications/JavascriptWebToken');

const userRegistration = async ({ displayName, email, password, image }) => {
  const userRequestedBD = await Users.findOne({ where: { email } });

  if (userRequestedBD) {
    const result = 'email already exists';
    return (result);
  }

  const newTokens = UserToken.generateNewToken({ id: Users.id });
  const createdUser = await Users.create({ displayName, email, password, image });

  if (createdUser) return newTokens;

  throw new Error(400, 'Invalid fields');
};

module.exports = { userRegistration };