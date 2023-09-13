import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getByEmail } from '../services/login.service';
import { JWT_EXPIRES_IN } from '../configs/env.conf';
import { JwtUser } from 'src/types/CRequest';

export async function postCredentials(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;

    const user = await getByEmail(body.email);
    const passwordCorrect = user === null ? false : await compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).send('Invalid email or password');
    }

    const userForToken: JwtUser = {
      id: user.id,
    };

    const token = sign(userForToken, process.env.SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).send({
      token,
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}
