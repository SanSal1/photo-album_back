import { User } from '../models/db.model';

export const getByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
