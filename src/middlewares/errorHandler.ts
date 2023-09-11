import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: { message: string; code: number }, _req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err.code && err.message) {
    res.status(err.code).send(err.message);
  } else {
    res.json(err);
  }
  next();
};

module.exports = errorHandler;
