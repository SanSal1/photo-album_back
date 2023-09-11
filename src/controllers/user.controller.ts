import { Request, Response, NextFunction } from 'express';
const userService = require('../services/user.service');

async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function postUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, getUser, postUser };
