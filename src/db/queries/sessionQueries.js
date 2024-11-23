import pool from '../connection.js';

const insertSession = (userId) => {
  pool.query(
    'INSERT INTO pollpoint.sessions (userId) VALUES ?',
    [userId],
    (insertErr) => {
      if (insertErr) {
        console.log(`Session insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('Session inserted.');
      return 0;
    },
  );
};
const deleteSession = (id) => {
  pool.query(
    'DELETE FROM pollpoint.sessions WHERE id = ?',
    [id],
    (deleteErr) => {
      if (deleteErr) {
        console.log(`Session deletion failed: ${deleteErr}`);
        return -1;
      }
      console.log('Session deleted.');
      return 0;
    },
  );
};

export {
  insertSession,
  deleteSession,
};