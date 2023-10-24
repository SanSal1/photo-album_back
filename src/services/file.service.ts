import { CFile, User } from '../models/db.model';

export const getById = async (id: string, userId?: number) => {
  const file = await CFile.findOne({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name'],
    },
    where: { id, userId },
  });
  if (!file) {
    throw { message: `File with ID ${id} not found.`, code: 404 };
  }
  return file;
};

export const create = async (userId: number, file: Express.Multer.File) => {
  const newFile = await CFile.create({ userId, ...file });
  return newFile;
};
