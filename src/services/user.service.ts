import { hash } from 'bcrypt';
import { User } from '../models/db.model';

export const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

export const getById = async (id: string) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw { message: `User with ID ${id} not found.`, code: 404 };
  }
  return user;
};

export const create = async (user: User) => {
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
    throw { message: `Provide a valide email.`, code: 400 };
  }
  const emailIsTaken = await User.findOne({ where: { email: user.email } });
  if (emailIsTaken) {
    throw { message: `Email ${user.email} is already in use.`, code: 400 };
  }
  const passwordHash = await hash(user.password, 10);
  const newUser = await User.create({ password: passwordHash, email: user.email, name: user.name });
  delete newUser.dataValues['password'];
  return newUser;
};

export const destroy = async (id: string) => {
  const success = await User.destroy({ where: { id } });
  if (!success) {
    throw { message: `User with ID ${id} not found.`, code: 404 };
  }
  return success;
};
