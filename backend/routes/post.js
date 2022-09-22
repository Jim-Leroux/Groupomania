// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const postCtrl = require("../controllers/post");
const multer = require("../middlewares/multer");
const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER
router.get("/", checkToken, postCtrl.getAll);

router.get("/getLikes", checkToken, postCtrl.getLikes);

router.put("/", multer.single("imageUrl"), checkToken, postCtrl.createOne);

router.put(
  "/update/:id",
  multer.single("imageUrl"),
  checkToken,
  postCtrl.updateOne
);

router.delete("/delete/:id", checkToken, postCtrl.deleteOne);

router.post("/like", checkToken, postCtrl.likeDislike);

module.exports = router;
