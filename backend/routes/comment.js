// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const commentCtrl = require("../controllers/comment");
const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER
router.get("/", commentCtrl.getAll); // code mort

router.get("/:id", commentCtrl.getOne); // code mort

router.put("/", checkToken, commentCtrl.createOne);

router.patch("/:id", checkToken, commentCtrl.updateOne);

router.post("/untrash/:id", checkToken, commentCtrl.untrashOne); // code mort

router.delete("/trash/:id", checkToken, commentCtrl.trashOne); // code mort

router.delete("/delete/:id", checkToken, commentCtrl.deleteOne);

module.exports = router;
