const mysql = require("mysql");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_HOST_NAME,
  process.env.HOST_USERNAME,
  process.env.HOST_PASSWORD,
  {
    host: process.env.HOST_HOST,
    dialect: "mysql",
    logging: false,
    port: 3306,
    pool: {
      max: 5, // Nombre maximal de connexions simultanées
      min: 0, // Nombre minimal de connexions
      acquire: 30000, // Délai avant expiration d'une connexion (en ms)
      idle: 10000, // Temps d'inactivité avant libération d'une connexion (en ms)
    },
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie !");
    // await sequelize.sync({ alter: true });
    // console.log("Les tables ont été synchronisées !");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
    throw error; // Remonte l'erreur pour être gérée par l'appelant
  }
}

module.exports = { sequelize, initializeDatabase };
