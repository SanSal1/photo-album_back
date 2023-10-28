import { Response, NextFunction } from 'express';
import { CRequest } from '../types/CRequest';
import { AlbumGetRequest } from '../types/AlbumGetRequest';
import { CFile } from '../models/db.model';
import { getAll as getAllAlbums, getById, create, update, destroy as destroyAlbum } from '../services/album.service';
import { bulkCreate, destroy as destroyAlbumFile } from '../services/albumFile.service';
import { getAll as getAllFiles } from '../services/file.service';

export async function getAlbums(req: AlbumGetRequest, res: Response, next: NextFunction) {
  try {
    const albums = await getAllAlbums(req.query, req.user?.id);
    res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
}

export async function getAlbum(req: CRequest, res: Response, next: NextFunction) {
  try {
    const album = await getById(req.params.id, req.user?.id);
    res.status(200).json(album);
  } catch (err) {
    next(err);
  }
}

export async function postAlbum(req: CRequest, res: Response, next: NextFunction) {
  try {
    const album = await create(req.user?.id, req.body);
    res.status(201).json(album);
  } catch (err) {
    next(err);
  }
}

export async function putAlbum(req: CRequest, res: Response, next: NextFunction) {
  try {
    const album = await update(req.params.id, req.body, req.user?.id);
    res.status(201).json(album);
  } catch (err) {
    next(err);
  }
}

export async function deleteAlbum(req: CRequest, res: Response, next: NextFunction) {
  try {
    const success = await destroyAlbum(req.params.id, req.user?.id);
    res.status(200).json(success);
  } catch (err) {
    next(err);
  }
}

export async function postAlbumFiles(req: CRequest, res: Response, next: NextFunction) {
  try {
    // Validate privacy settings
    const album = await getById(req.params.id, req.user?.id, false);
    if (album.userId !== req.user?.id) {
      throw { message: `Forbidden`, code: 403 };
    }
    const files = await getAllFiles(
      { userId: req.user?.id.toString(), private: album.private ? undefined : 'false' },
      req.user?.id,
      false
    );
    // Create relations
    const albumFiles = req.body.fileIds?.reduce((filtered: { albumId: string; fileId: number }[], fileId: number) => {
      if (files.find((file: CFile) => file.id === fileId)) {
        filtered.push({ albumId: req.params.id, fileId });
      }
      return filtered;
    }, []);
    const newAlbumFiles = await bulkCreate(albumFiles);
    res.status(201).json(newAlbumFiles);
  } catch (err) {
    next(err);
  }
}

export async function deleteAlbumFiles(req: CRequest, res: Response, next: NextFunction) {
  try {
    const album = await getById(req.params.albumId, req.user?.id, false);
    if (album.userId !== req.user?.id) {
      throw { message: `Forbidden`, code: 403 };
    }
    const success = await destroyAlbumFile(req.params.albumId, req.params.fileId);
    res.status(200).json(success);
  } catch (err) {
    next(err);
  }
}
