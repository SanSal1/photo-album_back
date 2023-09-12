import { Request, Response, NextFunction } from 'express';
import { getAll, getById, create } from '../services/user.service';

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
