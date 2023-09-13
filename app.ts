import express, { Express, Request, Response } from 'express';
import errorHandler from './src/middlewares/errorHandler';
import loginRouter from './src/routes/login.route';
import userRouter from './src/routes/user.route';

const app: Express = express();

app.use(express.static('build'));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'ok' });
});
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

export default app;
