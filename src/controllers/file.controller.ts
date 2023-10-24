import { Response, NextFunction } from 'express';
import { create, getById } from '../services/file.service';
import { CRequest } from '../types/CRequest';
import { join } from 'path';

export async function getFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const fileDb = await getById(req.params.id, req.user?.id);
    const rootDir = join(__dirname.split('dist')[0], 'images'); // TODO: Temporarily store images to this folder in development
    const options = { root: rootDir };
    res.sendFile(fileDb.name, options);
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
