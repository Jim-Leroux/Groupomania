// IMPORT DES MODULES
const express = require("express");
const authCtrl = require("../controllers/auth");

// RÉCUPÉRATION DU ROUTER D'EXPRESS
let router = express.Router();

// ROUTAGE DE LA RESSOURCE AUTH
router.post("/login", authCtrl.login);

module.exports = router;
