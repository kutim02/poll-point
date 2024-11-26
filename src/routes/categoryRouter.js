import express from 'express';
import { getAllCategories, insertCategory } from "../db/queries/categoryQueries.js";
import authorize from '../middlewares/auth.js';

const router = express.Router();
router.use(express.json());

router.get('/', authorize(), async (req, res) => {
    try{
        const [categories] = await getAllCategories();
        console.log(categories);
        res.status(200).send(categories);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/', authorize(), async(req, res) => {
    try {
        const categoryName = req.body.name;
        await insertCategory(categoryName);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;