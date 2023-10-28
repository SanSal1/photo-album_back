import { AlbumFile } from '../models/db.model';

export const bulkCreate = async (albumFiles: { albumId: number | string; fileId: number | string }[]) => {
  const newAlbumFiles = await AlbumFile.bulkCreate(albumFiles);
  return newAlbumFiles;
};

export const destroy = async (albumId: number | string, fileId: number | string) => {
  const success = await AlbumFile.destroy({ where: { albumId, fileId } });
  return success;
};
