import { Op } from 'sequelize';
import { Album, User } from '../models/db.model';
import { AlbumGetRequest } from '../types/AlbumGetRequest';

export const getAll = async (query: AlbumGetRequest['query'], userId?: number) => {
  const privateOptions = userId ? { [Op.or]: [{ private: false }, { userId }] } : { private: false };
  const userIdOptions = query.userId ? { userId: query.userId } : {};
  const albums = await Album.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name'],
    },
    where: { ...privateOptions, ...userIdOptions },
  });
  return albums;
};

export const getById = async (id: string, userId?: number) => {
  const privateOptions = userId ? { id, [Op.or]: [{ private: false }, { userId }] } : { id, private: false };
  const album = await Album.findOne({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name'],
    },
    where: privateOptions,
  });
  if (!album) {
    throw { message: `Album with ID ${id} not found.`, code: 404 };
  }
  return album;
};

export const create = async (userId: number, album: Album) => {
  const newAlbum = await Album.create({ userId, name: album.name, private: album.private });
  return newAlbum;
};

export const update = async (id: string, data: Album, userId?: number) => {
  const album = await Album.findOne({ where: { id, userId } });
  if (!album) {
    throw { message: `Album with ID ${id} not found.`, code: 404 };
  }
  const updatedAlbum = await album.update({ name: data.name, private: data.private });
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
