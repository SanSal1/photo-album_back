import { Request } from 'express';

export interface JwtUser {
  id: number;
}

export interface CRequest extends Request {
  user?: JwtUser;
}
