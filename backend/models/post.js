// IMPORT DES MODULES
const { DataTypes } = require("sequelize");

// DÉFINITION DU MODÈLE POST

module.exports = (sequelize) => {
  return (Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    { paranoid: true } // SoftDelete
  ));
};
