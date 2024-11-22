import pool from '../db/connection.js';

const insertQuestion = (text, userId, categoryId) => {
  pool.query(
    'INSERT INTO pollpoint.questions (text, userId, catId) VALUES (?, ?, ?)',
    [text, userId, categoryId],
    (insertErr) => {
      if (insertErr) {
        console.log(`Question insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('Question inserted.');
      return 0;
    },
  );
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
  insertQuestion,
  getQuestionsByUser,
  getQuestionsByCategory,
  getAllQuestions,
};