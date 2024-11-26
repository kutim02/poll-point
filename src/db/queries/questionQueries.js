import pool from '../connection.js';

const insertQuestion = (text, userId, categoryId) => {
  pool.query(
    'INSERT INTO pollpoint.questions (text, userId, catId) VALUES (?, ?, ?)',
    [text, userId, categoryId],
    (insertErr, result) => {
      if (insertErr) {
        console.error(`Question insertion failed: ${insertErr}`);
        return -1;
      }

      const insertedId = result.insertId;

      const insertedQuestion = {
        id: insertedId,
        text: text,
        userId: userId,
        categoryId: categoryId,
      };

      console.log('Inserted Question:', insertedQuestion);
      return insertQuestion;
    }
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