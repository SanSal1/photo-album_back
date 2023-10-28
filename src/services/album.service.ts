import { Op } from 'sequelize';
import { Album, CFile, User } from '../models/db.model';
import { AlbumGetRequest } from '../types/AlbumGetRequest';

export const getAll = async (query: AlbumGetRequest['query'], userId?: number) => {
  const privacyOptions = userId ? { [Op.or]: [{ private: false }, { userId }] } : { private: false };
  const userIdOptions = query.userId ? { userId: query.userId } : {};
  const albums = await Album.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
      {
        model: CFile,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
    where: { ...privacyOptions, ...userIdOptions },
  });
  return albums;
};

export const getById = async (id: string, userId?: number, showRelations = true) => {
  const privacyOptions = userId ? { id, [Op.or]: [{ private: false }, { userId }] } : { id, private: false };
  const includeOptions = showRelations
    ? {
        attributes: { exclude: ['userId'] },
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
          },
          {
            model: CFile,
            attributes: ['id', 'name', 'private'],
            through: { attributes: [] },
          },
        ],
      }
    : {};
  const album = await Album.findOne({
    where: privacyOptions,
    ...includeOptions,
  });
  if (!album) {
    throw { message: `Album with ID ${id} not found.`, code: 404 };
  }
  return album;
};

export const create = async (userId: number, body: Album) => {
  const newAlbum = await Album.create({ userId, name: body.name, private: body.private });
  return newAlbum;
};

export const update = async (id: string, body: Album, userId?: number) => {
  const album = await Album.findOne({ where: { id, userId } });
  if (!album) {
    throw { message: `Album with ID ${id} not found.`, code: 404 };
  }
  const updatedAlbum = await album.update({ name: body.name, private: body.private });
  updatedAlbum.save();
  return updatedAlbum;
};

export const destroy = async (id: string, userId?: number) => {
  const success = await Album.destroy({ where: { id, userId } });
  if (!success) {
    throw { message: `Album with ID ${id} not found.`, code: 404 };
  }
  return success;
};
