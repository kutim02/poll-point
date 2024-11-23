import express from 'express';
import { deleteSession } from '../db/queries/sessionQueries.js';
import authorize from '../middlewares/auth.js';

const router = express.Router();
router.use(express.json());

router.post('/', authorize(), async (req, res) => {
  try {
    await deleteSession(req.session.id);
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.redirect('/login');
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;