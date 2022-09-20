// IMPORT DES MODULES
const { DataTypes } = require("sequelize");

// DÉFINITION DU MODÈLE LIKES

module.exports = (sequelize) => {
  return (Like = sequelize.define("Like", {
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
  }));
};
