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

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_LOCAL_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_LOCAL_USER,
  password: process.env.DB_LOCAL_PASS,
  database: process.env.DB_LOCAL_NAME,
});

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
