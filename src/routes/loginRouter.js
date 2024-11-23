import express from 'express';
import bcrypt from 'bcrypt';
import { insertSession } from '../db/queries/sessionQueries.js';
import authorize from '../middlewares/auth.js';
import { getUser, getUserPassword } from '../db/queries/userQueries.js';

const router = express.Router();
router.use(express.json());

router.post('/', authorize(), async (req, res) => {
  try {
    let response = '';
    let success = true;
    const { username, password } = req.body;
    const userId = await getUser(username);
    if (userId === -1) {
      response = 'User does not exist.';
      success = false;
    } else {
      const userPassword = await getUserPassword(userId);
      if (userPassword === -1) {
        response = 'Could not check password.';
        success = false;
      } else if (!(await bcrypt.compare(password, userPassword))) {
        response = 'Incorrect password.';
        success = false;
      }
    }
    if (success) {
      req.session.id = req.id;
      req.session.userId = userId;
      insertSession(userId);
      res.redirect('/questions');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;