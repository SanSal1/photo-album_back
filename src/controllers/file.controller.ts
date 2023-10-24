import { Response, NextFunction } from 'express';
import { create } from '../services/file.service';
import { CRequest } from '../types/CRequest';

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await create(req.user?.id, req.file);
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}
