
import express from 'express';
import session from 'express-session';
import { creates } from './db/create.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
// import userRouter from './routes/userRouter.js';
// import questionRouter from './routes/questionRouter.js';
// import categoryRouter from './routes/categoryRouter.js';
// import answerRouter from './routes/answerRouter.js';
import authMiddleware from './middlewares/auth.js';

creates();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '142e6ecf42884f03',
        resave: true,
        saveUninitialized: true,
    }),
);
app.get('/', (req, res) => {
    renderQuestions(req, res);
});
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// app.use('/users', userRouter);
// app.use('/questions', questionRouter);
// app.use('/categories', categoryRouter);
// app.use('/answers', answerRouter);

app.use(authMiddleware);

app.listen(3000, () => {
    console.log('Server listening on 3000');
});
  