import { AlbumFile } from '../models/db.model';

export const bulkCreate = async (albumFiles: { albumId: string; fileId: string }[]) => {
  const newAlbumFiles = await AlbumFile.bulkCreate(albumFiles);
  return newAlbumFiles;
};

export const destroy = async (albumId: string, fileId: string) => {
  const success = await AlbumFile.destroy({ where: { albumId, fileId } });
  return success;
};
