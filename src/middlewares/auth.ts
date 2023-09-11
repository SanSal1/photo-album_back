import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return next({ message: 'Unauthorized', code: 401 });
  }
  verify(token, process.env.SECRET, (err) => {
    if (err) {
      return next({ message: 'Unauthorized', code: 401 });
    } else {
      next();
    }
  });
};

module.exports = auth;
