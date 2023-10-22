import { Response, NextFunction } from 'express';
import { CRequest } from 'src/types/CRequest';
import { getAll, getById, create, update, destroy } from '../services/album.service';
import { AlbumGetRequest } from 'src/types/AlbumGetRequest';

export async function getAlbums(req: AlbumGetRequest, res: Response, next: NextFunction) {
  try {
    const albums = await getAll(req.query, req.user?.id);
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
    const success = await destroy(req.params.id, req.user?.id);
    res.status(200).json(success);
  } catch (err) {
    next(err);
  }
}
