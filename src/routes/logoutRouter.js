import express from 'express';
import authorize from '../middlewares/auth.js';

const router = express.Router();
router.use(express.json());

router.post('/', authorize(), async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;