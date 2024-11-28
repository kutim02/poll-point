import pool from '../connection.js';

const insertAnswer = async (userId, questionId, answer) => {
  await pool.query(
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

const getAnswerByQuestionIdAndUserId = async (questionId, userId) => {
  const query = 'SELECT * FROM pollpoint.answers WHERE qId = ? AND userId = ?';
  const [answer] = await pool.query(query, [questionId, userId]);
  return answer;
};

const getGroupedAnswers = async () => {
  const query = `
    SELECT 
      qId,
      SUM(answer = true) AS trueCount,
      SUM(answer = false) AS falseCount
    FROM 
      pollpoint.answers
    GROUP BY 
      qId;
  `;
  const [results] = await pool.query(query);
  return results;
};

const getGroupedAnswersByQuestionId = async (questionId) => {
  const query = `
    SELECT 
      SUM(answer = true) AS trueCount,
      SUM(answer = false) AS falseCount
    FROM 
      pollpoint.answers
    WHERE 
      qId = ?;
  `;
  const [results] = await pool.query(query, [questionId]);
  return results[0];
};

export {
  getAllAnswersByQuestionId, getAnswerByQuestionIdAndUserId, getGroupedAnswers,
  getGroupedAnswersByQuestionId,
  insertAnswer
};

