// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer");

const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER

router.get("/:id", checkToken, userCtrl.getOne);

router.post("/", userCtrl.createOne);

router.post(
  "/update/:id",
  multer.single("user_picture"),
  checkToken,
  userCtrl.updateOne
);

module.exports = router;
