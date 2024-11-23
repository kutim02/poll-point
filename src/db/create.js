import pool from './connection.js';

export async function creates() {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS pollpoint.users(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    username varchar(45) UNIQUE,
    password varchar(64));
    `);
  } catch (err) {
    console.error(`Create users table error: ${err}`);
    process.exit(1);
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pollpoint.categories(
      id bigint AUTO_INCREMENT PRIMARY KEY,
      name varchar(45) UNIQUE);
    `);
  } catch (err) {
    console.error(`Create categories table error: ${err}`);
    process.exit(1);
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pollpoint.questions(
      id bigint AUTO_INCREMENT PRIMARY KEY,
      text varchar(100),
      userId bigint,
      catId bigint,
      FOREIGN KEY (userId) REFERENCES users(id), 
      FOREIGN KEY (catId) REFERENCES categories(id)); 
    `);
  } catch (err) {
    console.error(`Create questions table error: ${err}`);
    process.exit(1);
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pollpoint.answers(
      id bigint AUTO_INCREMENT PRIMARY KEY,
      userId bigint,
      qId bigint,
      answer boolean,
      FOREIGN KEY (userId) REFERENCES users(id), 
      FOREIGN KEY (qId) REFERENCES questions(id));
    `);
  } catch (err) {
    console.error(`Create answers table error: ${err}`);
    process.exit(1);
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pollpoint.sessions(
      id bigint AUTO_INCREMENT PRIMARY KEY,
      userId bigint,
      FOREIGN KEY (userId) REFERENCES users(id));
    `);
  } catch (err) {
    console.error(`Create sessions table error: ${err}`);
    process.exit(1);
  }
}

export default { creates };