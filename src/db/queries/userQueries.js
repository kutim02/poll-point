import pool from '../connection.js';

const insertUser = (username, password) => {
  pool.query(
    'INSERT INTO pollpoint.users (username, password) VALUES (?, ?)',
    [username, password],
    (insertErr) => {
      if (insertErr) {
        console.log(`User insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('User inserted.');
      return 0;
    },
  );
};

const getUser = async (username) => {
  const query = 'SELECT id FROM pollpoint.users WHERE username = ?';
  const [user] = await pool.query(query, username);
  if (user.length === 0) {
    return -1;
  }
  return user[0];
};

const getUserPassword = async (id) => {
  const query = 'SELECT password FROM pollpoint.users WHERE id = ?';
  const [password] = await pool.query(query, id);
  if (password.length === 0) {
    return -1;
  }
  return password;
}

const getUsernameById = async (id) => {
  const query = 'SELECT id FROM pollpoint.users WHERE id = ?';
  const [user] = await pool.query(query, id);
  if (user.length === 0) {
    return -1;
  }
  return user[0].username;
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM pollpoint.users ORDER BY username ASC';
  const [users] = await pool.query(query);
  return users;
};

export {
  insertUser,
  getUser,
  getUserPassword,
  getUsernameById,
  getAllUsers,
};