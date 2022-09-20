// IMPORT DES MODULES
const jwt = require("jsonwebtoken");
const DB = require("../db");
const User = DB.User;

// VÉRIFICATION DE LA PRÉSENCE DU TOKEN
const checkToken = async (req, res, next) => {
  // console.log(req.headers.authorization);
  // console.log(req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const userId = decodedToken.id;

    let user = await User.findOne({ where: { id: userId } });

    let isAdmin = user.isAdmin;

    if (user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.auth = {
        userId: userId,
        isAdmin: isAdmin,
      };
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.headers.authorization) {
  }
};

module.exports = checkToken;
