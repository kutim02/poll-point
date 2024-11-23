import pool from '../connection.js';

const insertAnswer = (userId, questionId, answer) => {
  pool.query(
    'INSERT INTO pollpoint.answers (userId, qId, answer) VALUES (?, ?, ?)',
    [userId, questionId, answer],
    (insertErr) => {
      if (insertErr) {
        console.log(`Answer insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('Answer inserted.');
      return 0;
    },
  );
};

const getAllAnswersByQuestionId = async (questionId) => {
  const query = 'SELECT * FROM pollpoint.answers WHERE qId = ?';
  const [answers] = await pool.query(query, questionId);
  return answers;
};

export {
  insertAnswer,
  getAllAnswersByQuestionId,
};