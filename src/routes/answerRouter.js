import express from 'express';
import { getGroupedAnswers, insertAnswer } from '../db/queries/answerQueries.js';

const router = express.Router();
router.use(express.json());

// const server = http.createServer();

// const io = new Server(server, {
//   cors: { origin: '*' },
//   path: '/answer',
// });

// io.on('connection', async (socket) => {
//   const id = crypto.randomBytes(8).toString('base64');
//   console.log(`[${id}] Socket connected: ${socket.conn.remoteAddress}`);

//   // lekerjuk es elkuldjuk a meglevo valaszokat
//   try {
//     const answers = await getGroupedAnswers();
//     socket.emit('loadAnswers', answer);
//   } catch (error) {
//     console.error('Error fetching answers:', error);
//   }

//   // uj valasz hozzaadasakor
//   socket.on('message', async (answer) => {
//     console.log(`[${id}] submitted a new answer'`);

//     try {
//       const savedAnswer = insertAnswer(answer.userId, answer.qId, answer.answer);

//       io.emit('message', savedAnswer);
//     } catch (error) {
//       console.error('Error saving new answer:', error);
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
      const answer = true, userId = 1, qID = 1;
      await insertAnswer(answer, userId, qID);
      res.status(201).send({"answer": answer, "userId": userId, "qID": qID});
  } catch(err) {
      console.log(err);
      res.status(500).send(err);
  }
});

router.get('/', async(req, res) => {
    try {
        const answers = await getGroupedAnswers();
        res.status(200).send(answers);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
  });

export default router;
