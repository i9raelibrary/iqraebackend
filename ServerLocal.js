const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const http = require("http");
const { sequelize, initializeDatabase } = require("./Config/db.js");

const { ArticleRouter } = require("./Routes/ArticleRoute.js");
const { ClientRouter } = require("./Routes/ClientRoute.js");
const { CommandeRouter } = require("./Routes/CommandeRoute.js");
const { AdminRouter } = require("./Routes/AdminRoute.js");
const { CategorieRouter } = require("./Routes/CategorieRoute.js");
const { PackRouter } = require("./Routes/PackRoute.js");
const {commandePackRouter} = require("./Routes/CommandePackRoute.js");

const { Article } = require("./Models/Article");
const { Client } = require("./Models/Client");
const { Commande } = require("./Models/Commande");
const { Admin } = require("./Models/Admin");
const { Categorie } = require("./Models/Categorie");
const { CommandeDetail } = require("./Models/CommadeDetails.js");
const { Pack } = require("./Models/Pack.js");
const { CommandePack } = require("./Models/CommandePack.js");
const app = express();

app.use(express.json());
app.use(cors());

//Routers
app.use("/api/article", ArticleRouter);
app.use("/api/client", ClientRouter);
app.use("/api/commande", CommandeRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/categories", CategorieRouter);
app.use("/images", express.static("./Uploads"));
app.use("/api/pack", PackRouter);
app.use("/api/commandepackage", commandePackRouter);

// Fonction pour démarrer le serveur
function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

initializeDatabase()
  .then(() => startServer())
  .catch((error) => {
    console.error("Erreur lors de l'initialisation de l'application :", error);
    process.exit(1); // Arrêter l'application en cas d'échec critique
  });

