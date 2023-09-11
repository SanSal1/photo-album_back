import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
const userService = require('../services/user.service');

async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;

    const user = await userService.getByEmail(body.email);
    const passwordCorrect = user === null ? false : await compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).send('Invalid email or password');
    }

    const userForToken = {
      email: user.email,
      id: user.id,
    };

    const token = sign(userForToken, process.env.SECRET);

    res.status(200).send({
      token,
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { post };
