// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer");

const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER

router.post("/", checkToken, userCtrl.getAll);

router.post("/:id", checkToken, userCtrl.getOne);

router.put("/", userCtrl.createOne);

router.put(
  "/update/:id",
  multer.single("user_picture"),
  checkToken,
  userCtrl.updateOne
);

router.patch("/:id", checkToken, userCtrl.updateOne);

router.post("/untrash/:id", checkToken, userCtrl.untrashOne);

router.delete("/trash/:id", checkToken, userCtrl.trashOne);

router.delete("/:id", checkToken, userCtrl.deleteOne);

module.exports = router;
