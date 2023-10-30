import { Request } from 'express';

export interface JwtUser {
  id: string;
}

export interface CRequest extends Request {
  user?: JwtUser;
}
