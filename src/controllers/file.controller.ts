import { Response, NextFunction } from 'express';
import { create, getById } from '../services/file.service';
import { CRequest } from '../types/CRequest';

export async function getFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await getById(req.params.id, req.user?.id);
    res.status(200).json(file);
  } catch (err) {
    next(err);
  }
}

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await create(req.user?.id, req.file);
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}
