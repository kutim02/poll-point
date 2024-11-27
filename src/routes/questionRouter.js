import express from 'express';
import { insertQuestion } from '../db/queries/questionQueries.js';

const router = express.Router();
router.use(express.json());

// const server = http.createServer();

// const io = new Server(server, {
//   cors: { origin: '*' },
//   path: '/questions',
// });

// io.on('connection', async (socket) => {
//   const id = crypto.randomBytes(8).toString('base64');
//   console.log(`[${id}] Socket connected: ${socket.conn.remoteAddress}`);

//   // lekerjuk es elkuldjuk a meglevo kerdeseket
//   try {
//     const questions = await getAllQuestions();
//     socket.emit('loadQuestions', questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//   }

//   // uj kerdesek hozzaadasakor
//   socket.on('message', async (question) => {
//     console.log(`[${id}] submitted a new question: '${question.text}'`);

//     try {
//       const savedQuestion = insertQuestion(question.text, question.userId, question.categoryId);

//       io.emit('message', savedQuestion);
//     } catch (error) {
//       console.error('Error saving new question:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log(`[${id}] Socket disconnected`);
//   });

//   // adunk egy id-t a kliensnek
//   socket.emit('assignid', id);
// });

// const port = process.env.PORT || 8080;
// server.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}/ ...`);
// });

router.post('/', async(req, res) => {
  try {
      console.log('trying to insert');
      const id = await insertQuestion('What is your favorite color?', 1, 1)
      console.log(id);
      res.status(201).send({"id": id});
  } catch(err) {
      console.log(err);
      res.status(500).send(err);
  }
});

export default router;
