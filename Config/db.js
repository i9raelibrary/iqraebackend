const { Sequelize } = require('sequelize');
require('dotenv').config();

const requiredEnvVars = [
  'DB_LOCAL_NAME', 'DB_LOCAL_USER', 'DB_LOCAL_PASS', 'DB_LOCAL_HOST', 'DB_PORT',
  'HOST_USERNAME', 'HOST_PASSWORD', 'HOST_HOST'
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: Missing environment variable ${envVar}`);
  }
});

const sequelize = new Sequelize(
  process.env.DB_HOST_NAME,
  process.env.HOST_USERNAME,
  process.env.HOST_PASSWORD,
  {
    host: process.env.HOST_HOST,
    dialect: 'mysql',
    logging: false,
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Initialize database connection
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database was successful!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message || error);
    throw error;
  }
}

module.exports = { sequelize, initializeDatabase };
