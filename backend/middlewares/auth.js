// IMPORT DES MODULES
const jwt = require("jsonwebtoken");

// VÉRIFICATION DE LA PRÉSENCE DU TOKEN
const checkToken = (req, res, next) => {
  console.log(req.body);
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.verify(
    token,
    `${process.env.JWT_SECRET}`,
    (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = decodedToken.id;

      req.body.user_id = parseInt(req.body.user_id);

      if (req.body.admin_access === process.env.ADMIN_ACCESS) {
        next();
      } else if (!req.body.user_id || req.body.user_id !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    }
  );
};

module.exports = checkToken;
