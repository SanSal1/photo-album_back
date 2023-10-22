import { Response, NextFunction } from 'express';
import { CRequest } from 'src/types/CRequest';

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    // TODO: Handle file
    console.log(req.file);
    res.status(201).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
}
