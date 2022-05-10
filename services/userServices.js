const { Users } = require('../models');
const UserToken = require('../authentications/JavascriptWebToken');

const userRegistration = async ({ displayName, email, password, image }) => {
  const userRequestedBD = await Users.findOne({ where: { email } });

  if (userRequestedBD) {
    const result = 'email already exists';
    return (result);
  }

  const newToken = UserToken.generateNewToken({ id: Users.id });
  const createdUser = await Users.create({ displayName, email, password, image });

  if (createdUser) return newToken;

  // throw new Error(400, 'Invalid fields');
};

const getUsers = async () => {
  const allUsers = await Users.findAll({ attributes: { exclude: 'password' } });
  return allUsers;
};

module.exports = { userRegistration, getUsers };