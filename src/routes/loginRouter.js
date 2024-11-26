import bcrypt from 'bcrypt';
import express from 'express';
import { insertSession } from '../db/queries/sessionQueries.js';
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
    console.log(userId);
    if (userId === undefined) {
      response = 'User does not exist.';
      success = false;
    } else {
      const userPassword = user.password;
      console.log(userPassword);
      if (userPassword === -1) {
        response = 'Could not check password.';
        success = false;
      } else if (!(await bcrypt.compare(password, userPassword))) {
        response = 'Incorrect password.';
        success = false;
      }
    }
    if (success) {
      //req.session.id = req.id;
      req.session.userId = userId;
      insertSession(userId);
      res.status(200).cookie('userId', userId, {
      httpOnly: true, 
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