import pool from '../connection.js';

const insertQuestion = async (text, userId, catId) => {
  await pool.query(
    'INSERT INTO pollpoint.questions (text, userId, catId) VALUES (?, ?, ?)',
    [text, userId, catId],
    (insertErr) => {
      if (insertErr) {
        console.log(`Question insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('Question inserted.');
      
    },
  );
  const idResult = await pool.query(
    'SELECT LAST_INSERT_ID() as id', []
  );
  console.log(idResult);
  return  idResult[0][0]?.id;
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

