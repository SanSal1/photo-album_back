import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err?.code && err?.message) {
    res.status(err.code).send(err.message);
  } else {
    res.json(err);
  }
  next();
};

export default errorHandler;
