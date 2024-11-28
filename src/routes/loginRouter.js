import bcrypt from 'bcrypt';
import express from 'express';
import { getUser } from '../db/queries/userQueries.js';

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    let response = '';
    let success = true;
    const { username, password } = req.body;
    const user = await getUser(username);
    const userId = user.id;
    if (userId === undefined) {
      response = 'User does not exist.';
      success = false;
    } else {
      const userPassword = user.password;
      if (userPassword === -1) {
        response = 'Could not check password.';
        success = false;
      } else if (!(await bcrypt.compare(password, userPassword))) {
        response = 'Incorrect password.';
        success = false;
      }
    }
    if (success) {
      req.session.userId = userId;
      res.status(200).cookie('userId', userId, {
      httpOnly: false, 
      secure: false,  
      maxAge: 3600000
      }).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;