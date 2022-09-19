// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const postCtrl = require("../controllers/post");
const multer = require("../middlewares/multer");
const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER
router.get("/", postCtrl.getAll);

router.post("/getLikes", postCtrl.getLikes);

router.get("/:id", postCtrl.getOne);

router.put("/", multer.single("imageUrl"), checkToken, postCtrl.createOne);

router.put(
  "/update/:id",
  multer.single("imageUrl"),
  checkToken,
  postCtrl.updateOne
);

router.post("/untrash/:id", checkToken, postCtrl.untrashOne);

router.delete("/trash/:id", checkToken, postCtrl.trashOne);

router.post("/delete/:id", checkToken, postCtrl.deleteOne);

router.post("/like", postCtrl.likeDislike);

module.exports = router;
