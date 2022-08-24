// IMPORT DES MODULES
const { DataTypes } = require("sequelize");

// DÉFINITION DU MODÈLE COMMENT

module.exports = (sequelize) => {
  return (Comment = sequelize.define(
    "Comment",
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
      post_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
    },
    { paranoid: true } // SoftDelete
  ));
};
