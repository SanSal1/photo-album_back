import { CFile } from '../models/db.model';

export const getById = async (id: string, userId?: number) => {
  const file = await CFile.findOne({ where: { id, userId } });
  if (!file) {
    throw { message: `File with ID ${id} not found.`, code: 404 };
  }
  return file;
};

export const create = async (userId: number, file: Express.Multer.File) => {
  const newFile = await CFile.create({ userId, name: file.filename });
  return newFile;
};
