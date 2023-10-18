import { Op } from 'sequelize';
import { Album } from '../models/db.model';

export const getAll = async (userId?: number) => {
  const options = userId ? { where: { [Op.or]: [{ private: false }, { userId }] } } : { where: { private: false } };
  const albums = await Album.findAll(options);
  return albums;
};

export const getById = async (id: string, userId?: number) => {
  const options = userId
    ? { where: { id, [Op.or]: [{ private: false }, { userId }] } }
    : { where: { id, private: false } };
  const album = await Album.findOne(options);
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
