module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
        //   allowNull: false,
      },
      image: {
          type: DataTypes.STRING,
      },
  }, { timestamps: false,
    modelName: 'Users' });
  return Users;
};