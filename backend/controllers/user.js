// IMPORT DES MODULES
const { RequestError, UserError } = require("../error/customError");
const bcrypt = require("bcrypt");
const DB = require("../db");
const fs = require("fs");
const User = DB.User;

// ROUTAGE DE LA RESSOURCE USER

exports.getOne = async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);

    if (!userId) {
      throw new RequestError("Missing parameter");
    }
    let user = await User.findOne({ where: { id: userId } });

    if (user === null) {
      throw new UserError("This user does not exist !", 0);
    }

    return res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const { name, firstname, email, password } = req.body;

    if (!name || !firstname || !email || !password) {
      throw new RequestError("Missing parameter");
    }
    let user = await User.findOne({ where: { email: email }, raw: true });

    if (user !== null) {
      throw new UserError(`The user ${name} already exists !`);
    }

    fs.copyFile(
      "images/user-icon.png",
      `images/user-icon-copie${req.body.name}.png`,
      (error) => {
        if (error) throw error;
      }
    );

    const picture = `${req.protocol}://${req.get(
      "host"
    )}/images/user-icon-copie${req.body.name}.png`;

    req.body.imageUrl = picture;

    if (req.body.email === `${process.env.ADMIN_ACCESS}`) {
      req.body.isAdmin = true;
    }

    let newUser = await User.create(req.body);

    return res.json({ message: "User Created", data: newUser });
  } catch (error) {
    next(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    let {
      user_firstname,
      user_name,
      user_email,
      user_password,
      user_imageUrl,
    } = req.body;

    let userId = parseInt(req.params.id);

    if (!userId) {
      return res.status(400).json({ message: "Missing Parameter" });
    }

    let user = await User.findOne({ where: { id: userId }, raw: true });

    if (user === null) {
      return res.status(404).json({ message: "This user does not exist !" });
    }

    if (req.auth.userId !== user.id) {
      throw new RequestError("Unhautorized", 1);
    }

    user_password = await bcrypt.hash(user_password, 10);

    if (req.file) {
      const filename = user.imageUrl.split("/images/")[1];

      fs.unlink(`images/${filename}`, (error) => {
        if (error) throw error;
      });

      const picture = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;

      user_picture = picture;

      let newUser = {
        firstname: user_firstname,
        name: user_name,
        email: user_email,
        password: user_password,
        imageUrl: user_picture,
      };

      await User.update(newUser, { where: { id: userId } });
    } else {
      let newUser = {
        firstname: user_firstname,
        name: user_name,
        email: user_email,
        password: user_password,
      };

      await User.update(newUser, { where: { id: userId } });
    }

    return res.json({ message: "User Updated" });
  } catch (error) {
    next(error);
  }
};
