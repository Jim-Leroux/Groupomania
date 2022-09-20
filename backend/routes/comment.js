// IMPORT DES MODULES
const checkToken = require("../middlewares/auth");
const commentCtrl = require("../controllers/comment");
const express = require("express");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE USER
router.put("/", checkToken, commentCtrl.createOne);

router.patch("/:id", checkToken, commentCtrl.updateOne);

router.delete("/delete/:id", checkToken, commentCtrl.deleteOne);

module.exports = router;
