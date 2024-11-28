import bcrypt from 'bcrypt';
import express from 'express';
import { getQuestionsByUser } from '../db/queries/questionQueries.js';
import { insertUser } from "../db/queries/userQueries.js";

const router = express.Router();
router.use(express.json());

const saltRounds = 15;
router.post('/', async(req, res) => {
    try {
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        console.log(password);
        await insertUser(username, password);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id/questions', async (req, res) => {
    try {
        const { id } = req.params; 
        console.log(id);
        const questions = await getQuestionsByUser(id); 
        res.status(200).send(questions); 
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


export default router;