import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getById } from '../services/user.service';
import { CRequest, JwtUser } from '../types/CRequest';
import Role from '../types/Role';
import { SECRET } from '../configs/env.conf';

export const validateToken = (allowGuests = false) => {
  return (req: CRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      if (allowGuests) {
        req.user = null;
        next();
      } else {
        return next({ message: 'Unauthorized', code: 401 });
      }
    } else {
      verify(token, SECRET, (err, user: JwtUser) => {
        if (err) {
          return next({ message: 'Unauthorized', code: 401 });
        } else {
          req.user = user;
          next();
        }
      });
    }
  };
};

export const isAdmin = async (req: CRequest, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next({ message: 'Unauthorized', code: 401 });
  }
  const user = await getById(req.user.id.toString());
  if (user.role !== Role.Admin) {
    return next({ message: 'Unauthorized', code: 401 });
  } else {
    next();
  }
};
