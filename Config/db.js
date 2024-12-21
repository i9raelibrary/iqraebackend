const { Sequelize } = require('sequelize');
require('dotenv').config();  // Ensure dotenv is loaded

// Check if all required environment variables are defined
const requiredEnvVars = [
  'DB_LOCAL_NAME', 'DB_LOCAL_USER', 'DB_LOCAL_PASS', 'DB_LOCAL_HOST', 'DB_PORT',
  'HOST_USERNAME', 'HOST_PASSWORD', 'HOST_HOST'
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: Missing environment variable ${envVar}`);
  }
});

// Sequelize connection setup
const sequelize = new Sequelize(
  process.env.DB_LOCAL_NAME || process.env.DB_HOST_NAME,  // Use local or hosted database name
  process.env.DB_LOCAL_USER || process.env.HOST_USERNAME,  // Use local or hosted username
  process.env.DB_LOCAL_PASS || process.env.HOST_PASSWORD,  // Use local or hosted password
  {
    host: process.env.DB_LOCAL_HOST || process.env.HOST_HOST,  // Use local or hosted host
    dialect: 'mysql',
    logging: false,  // Set to 'true' if you want to see SQL logs
    port: process.env.DB_PORT || 3306,  // Default MySQL port (can be overridden)
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
    await sequelize.authenticate();  // Check if connection is successful
    console.log('Connection to the database was successful!');
    // Uncomment the next line to sync models to the DB if needed (be careful with production environments)
    // await sequelize.sync({ alter: true });  
    // console.log('Tables have been synchronized!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message || error);
    throw error;  // Propagate the error for handling by the caller
  }
}

module.exports = { sequelize, initializeDatabase };
