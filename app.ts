import express, { Express, Request, Response } from 'express';
const errorHandler = require('./src/middlewares/errorHandler');
const auth = require('./src/middlewares/auth');
const loginRouter = require('./src/routes/login.route');
const userRouter = require('./src/routes/user.route');

const app: Express = express();

app.use(express.static('build'));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'ok' });
});
app.use('/api/login', loginRouter);

app.use(auth);
app.use('/api/users', userRouter);
app.use(errorHandler);

module.exports = app;
