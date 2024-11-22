import pool from '../db/connection.js';

const insertCategory = (name) => {
  pool.query(
    'INSERT INTO pollpoint.categories (name) VALUES ?',
    [name],
    (insertErr) => {
      if (insertErr) {
        console.log(`Category insertion failed: ${insertErr}`);
        return -1;
      }
      console.log('Category inserted.');
      return 0;
    },
  );
};

const getAllCategories = async () => {
  const query = 'SELECT * FROM pollpoint.categories';
  const [categories] = await pool.query(query);
  return categories;
};

export {
  insertCategory,
  getAllCategories,
};