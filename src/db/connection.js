import mysql from 'mysql2/promise.js';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
});

try {
  await pool.query(' CREATE DATABASE IF NOT EXISTS pollpoint;');
} catch (err) {
  console.error(`Create database error: ${err}`);
  process.exit(1);
}

export default pool;
