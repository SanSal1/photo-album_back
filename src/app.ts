import express, { Express, Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import loginRouter from './routes/login.route';
import userRouter from './routes/user.route';
import albumRouter from './routes/album.route';

const app: Express = express();

app.use(express.static('build'));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'ok' });
});
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/albums', albumRouter);
app.use(errorHandler);

export default app;
