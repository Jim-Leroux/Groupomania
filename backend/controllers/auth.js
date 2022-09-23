// IMPORT DES MODULES
const jwt = require("jsonwebtoken");
const DB = require("../db");
const User = DB.User;

const { AuthenticationError } = require("../error/customError");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AuthenticationError("Missing parameter", 1);
    }
    let user = await User.findOne({ where: { email: email }, raw: true });

    if (user === null) {
      throw new AuthenticationError("Wrong email or password", 0);
    }

    let test = await User.checkPassword(password, user.password);

    if (!test) {
      throw new AuthenticationError("Wrong email or password", 0);
    }

    const userId = user.id;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_DURING,
    });

    return res.status(200).json({ access_token: token, userId });
  } catch (error) {
    next(error);
  }
};
