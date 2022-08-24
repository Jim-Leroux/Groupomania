// IMPORT DES MODULES
const errorHandler = require("./error/errorHandler");
const express = require("express");
const path = require("path");
const cors = require("cors");

// IMPORT DE LA CONNEXION BDD
let DB = require("./db");

// INITIALISATION DE L'API
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORT DES MODULES DE ROUTAGE
const auth_router = require("./routes/auth");
const user_router = require("./routes/user");
const post_router = require("./routes/post");
const comment_router = require("./routes/comment");

// MISE EN PLACE DU ROUTAGE
app.get("/", (req, res) => res.send("En ligne !"));

app.use("/auth", auth_router);
app.use("/users", user_router);
app.use("/posts", post_router);
app.use("/comments", comment_router);

// ACCÈS AUX IMAGES
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("*", (req, res) => res.status(501).send("Rien à faire ici."));

app.use(errorHandler);

// DÉMARRAGE DU SERVEUR + TEST BDD
DB.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to db");
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => console.log("Database Error", error));
