module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
      displayName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      image: {
          type: DataTypes.STRING,
      },
  }, { timestamps: false });
  return users;
};