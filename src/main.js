
import cors from 'cors';
import crypto from "crypto";
import express from 'express';
import session from 'express-session';
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import { creates } from './db/create.js';
import { getAllQuestions, insertQuestion } from './db/queries/questionQueries.js';
import authMiddleware from './middlewares/auth.js';
import answerRouter from './routes/answerRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import userRouter from './routes/userRouter.js';
import { insertAnswer, getGroupedAnswers, getGroupedAnswersByQuestionId } from './db/queries/answerQueries.js';

creates();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '142e6ecf42884f03',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false,              
            maxAge: 3600000          
          }
    }),
);
app.get('/', (req, res) => {
    renderQuestions(req, res);
});
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/answers', answerRouter);

app.use(authMiddleware);

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws) => {
  const id = crypto.randomBytes(8).toString("base64");
  console.log(`[${id}] Socket connected`);

  const oldQuestions = await getAllQuestions();
  oldQuestions.forEach(async (question) => {
    const { trueCount, falseCount } = await getGroupedAnswersByQuestionId(question.id);
    ws.send(JSON.stringify({ 
      type: 'question', 
      question, 
      trueCount,
      falseCount 
    }));
  });

  ws.on("message", async (data) => {
    const message = JSON.parse(data);

    console.log('*** message: ', message);
    console.log('--- message type: ', message.type);

    if (message.type === 'answer') {
      insertAnswer(message.userId, message.questionId, message.answer);

      const { trueCount, falseCount } = await getGroupedAnswersByQuestionId(message.questionId);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "answer",
            questionId: message.questionId,
            trueCount,
            falseCount
          }));
        }
      });
    } else if (message.type === 'message') {
      console.log(`[${id}] submitted a new question: '${message.text}'`);

      console.log(await insertQuestion(message.text, message.userId, message.category));
      
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ 
            type: "question", 
            question: message,
            trueCount: 0,
            falseCount: 0
          }));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log(`[${id}] Socket disconnected`);
  });
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/ ...`);
});


app.listen(3000, () => {
    console.log('Server listening on 3000');
});
  