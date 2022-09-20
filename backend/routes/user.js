// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer");

const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER

router.get("/", checkToken, userCtrl.getAll); // code mort

router.get("/:id", checkToken, userCtrl.getOne);

router.post("/", userCtrl.createOne);

router.post(
  "/update/:id",
  multer.single("user_picture"),
  checkToken,
  userCtrl.updateOne
);

router.patch("/:id", checkToken, userCtrl.updateOne); // code mort

router.post("/untrash/:id", checkToken, userCtrl.untrashOne); // code mort

router.delete("/trash/:id", checkToken, userCtrl.trashOne); // code mort

router.delete("/:id", checkToken, userCtrl.deleteOne); // code mort

module.exports = router;
