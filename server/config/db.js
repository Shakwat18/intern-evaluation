require('dotenv').config();
const { Pool } = require('pg');

// Initialize the database connection pool using the string from your .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon secure SSL connections
  },
});

// A helper function to execute database queries cleanly across controllers
module.exports = {
  query: (text, params) => pool.query(text, params),
};
