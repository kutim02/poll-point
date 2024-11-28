import express from 'express';
import { getAnswerByQuestionIdAndUserId } from '../db/queries/answerQueries.js';

const router = express.Router();
router.use(express.json());

router.get('/', async(req, res) => {
    try {
        const {questionId, userId} = req.query;
        const answer = await getAnswerByQuestionIdAndUserId(questionId, userId);
        res.status(200).send(answer);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
  });

export default router;
