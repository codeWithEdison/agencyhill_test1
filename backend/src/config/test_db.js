const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM users');
    console.log('Connection successful! User count:', result.rows[0].count);
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    pool.end();
  }
}

testConnection();