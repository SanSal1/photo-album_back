import { CFile } from '../models/db.model';

export const create = async (userId: number, file: Express.Multer.File) => {
  const newFile = await CFile.create({ userId, ...file });
  return newFile;
};
