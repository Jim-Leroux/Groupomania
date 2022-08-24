// IMPORT DES MODULES
const { Sequelize } = require("sequelize");

// CONNEXION À LA BDD
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// MISE EN PLACE DES RELATIONS
const DB = {};
DB.sequelize = sequelize;
DB.User = require("./models/user")(sequelize);
DB.Post = require("./models/post")(sequelize);
DB.Like = require("./models/like")(sequelize);
DB.Comment = require("./models/comment")(sequelize);

DB.User.hasMany(DB.Post, { foreignKey: "user_id", onDelete: "cascade" });
DB.User.hasMany(DB.Comment, { foreignKey: "user_id", onDelete: "cascade" });

DB.Post.hasMany(DB.Comment, { foreignKey: "post_id", onDelete: "cascade" });
DB.Post.hasMany(DB.Like, { foreignKey: "post_id", onDelete: "cascade" });
DB.Post.belongsTo(DB.User, { foreignKey: "user_id", onDelete: "cascade" });

DB.Comment.belongsTo(DB.User, { foreignKey: "user_id" });
DB.Comment.belongsTo(DB.Post, { foreignKey: "post_id" });

DB.Like.belongsTo(DB.Post, { foreignKey: "post_id" });

// SYNCHRONISATION DES MODÈLES
DB.sequelize.sync({ alter: true });

module.exports = DB;
