import { Response, NextFunction } from 'express';
import { create, getById, getAll } from '../services/file.service';
import { CRequest } from '../types/CRequest';
import { join } from 'path';

export async function getFilesData(req: CRequest, res: Response, next: NextFunction) {
  try {
    const filesData = await getAll(req.query, req.user?.id);
    res.status(200).json(filesData);
  } catch (err) {
    next(err);
  }
}

export async function getFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await getById(req.params.id, req.user?.id);
    const root = join(__dirname.split('dist')[0], 'images'); // TODO: Temporarily store images to this folder in development
    res.sendFile(file.name, { root });
  } catch (err) {
    next(err);
  }
}

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await create(req.file, req.body, req.user?.id);
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}
