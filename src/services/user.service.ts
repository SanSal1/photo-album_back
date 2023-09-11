import { hash } from 'bcrypt';
const db = require('../models/db.model');

const User = db.User;

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw { message: `User with ID ${id} not found.`, code: 404 };
  }
  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const create = async (user) => {
  const emailIsTaken = await User.findOne({ where: { email: user.email } });
  if (emailIsTaken) {
    throw { message: `Email ${user.email} is already in use.`, code: 400 };
  }
  const passwordHash = await hash(user.password, 10);
  const newUser = await User.create({ password: passwordHash, email: user.email });
  delete newUser.dataValues['password'];
  return newUser;
};

module.exports = {
  create,
  getAll,
  getById,
  getByEmail,
};
