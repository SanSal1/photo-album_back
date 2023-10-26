import { AlbumFile } from '../models/db.model';

export const bulkCreate = async (albumFiles: { albumId: number | string; fileId: number }[]) => {
  const newAlbumFiles = await AlbumFile.bulkCreate(albumFiles);
  return newAlbumFiles;
};
