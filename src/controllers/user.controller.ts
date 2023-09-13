import { Request, Response, NextFunction } from 'express';
import { getAll, getById, create, destroy } from '../services/user.service';
import { CRequest } from 'src/types/CRequest';

export async function getUsers(_req: CRequest, res: Response, next: NextFunction) {
  try {
    const users = await getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: CRequest, res: Response, next: NextFunction) {
  try {
    const user = await getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req: CRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw { message: `Unauthorized`, code: 401 };
    }
    const user = await getById(req.user.id.toString());
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

export async function deleteUser(req: CRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw { message: `Unauthorized`, code: 401 };
    }
    if (req.user.id.toString() === req.params.id) {
      throw { message: `Cannot delete own user`, code: 403 };
    }
    const success = await destroy(req.params.id);
    res.status(200).json(success);
  } catch (err) {
    next(err);
  }
}
