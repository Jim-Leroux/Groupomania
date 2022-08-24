// IMPORT DES MODULES
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// DÉFINITION DU MODÈLE USER
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        default: "",
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(100),
        default: "",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true, // Validation de l'email
        },
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-fA-Z]{64}$/i, // Contrainte du MDP
      },
      imageUrl: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    { paranoid: true } // SoftDelete
  );

  User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.checkPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
  };

  // User.updatePassword = async (user) => {
  //   user.password = await bcrypt.hash(user.password, 10);
  // };

  return User;
};
