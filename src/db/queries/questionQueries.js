import pool from '../connection.js';

const insertQuestion = async (text, userId, catId) => {
  try {
    await pool.query(
      'INSERT INTO pollpoint.questions (text, userId, catId) VALUES (?, ?, ?)',
      [text, userId, catId]
    );
    
    const [idResult] = await pool.query('SELECT LAST_INSERT_ID() AS id');
    
    return idResult[0]?.id || null;
  } catch (insertErr) {
    console.log(`Question insertion failed: ${insertErr}`);
    return null;
  }
};

const getQuestionsByUser = async (userId) => {
  const query = 'SELECT * FROM pollpoint.questions WHERE userId = ?';
  const [questions] = await pool.query(query, userId);
  return questions;
};

const getQuestionsByCategory = async (categoryId) => {
  const query = 'SELECT * FROM pollpoint.questions WHERE catId = ?';
  const [questions] = await pool.query(query, categoryId);
  return questions;
};

const getAllQuestions = async () => {
  const query = 'SELECT * FROM pollpoint.questions';
  const [questions] = await pool.query(query);
  return questions;
};

export {
  getAllQuestions, getQuestionsByCategory, getQuestionsByUser, insertQuestion
};

