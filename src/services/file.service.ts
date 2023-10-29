import { Op } from 'sequelize';
import { CFile, User } from '../models/db.model';
import { FileGetRequest } from '../types/FileGetRequest';

export const getAll = async (query: FileGetRequest['query'], userId?: number, showRelations = true) => {
  let privacyOptions: object = { private: false };
  const includeOptions = showRelations
    ? {
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['id', 'name'],
        },
      }
    : {};
  if (query.private === 'true') {
    privacyOptions = { private: true, userId };
  } else if (userId && query.private !== 'false') {
    privacyOptions = { [Op.or]: [{ private: false }, { userId }] };
  }
  const userIdOptions = query.userId ? { userId: query.userId } : {};
  const files = await CFile.findAll({
    where: { ...privacyOptions, ...userIdOptions },
    ...includeOptions,
  });
  return files;
};

export const getById = async (id: string, userId?: number) => {
  const privacyOptions = userId ? { id, [Op.or]: [{ private: false }, { userId }] } : { id, private: false };
  const file = await CFile.findOne({ where: privacyOptions });
  if (!file) {
    throw { message: `File with ID ${id} not found.`, code: 404 };
  }
  return file;
};

export const create = async (body: { private: boolean; originalName: string; s3Key: string }, userId?: number) => {
  const newFile = await CFile.create({ userId, name: body.originalName, s3Key: body.s3Key, private: body.private });
  delete newFile.dataValues['s3Key'];
  return newFile;
};
