
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { creates } from './db/create.js';
import authMiddleware from './middlewares/auth.js';
import answerRouter from './routes/answerRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import questionRouter from './routes/questionRouter.js';
import userRouter from './routes/userRouter.js';

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
app.use('/questions', questionRouter);
app.use('/categories', categoryRouter);
app.use('/answers', answerRouter);

app.use(authMiddleware);

app.listen(8080, () => {
    console.log('Server listening on 8080');
});
  