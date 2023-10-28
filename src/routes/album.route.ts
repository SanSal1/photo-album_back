import { Router } from 'express';
import {
  getAlbums,
  getAlbum,
  postAlbum,
  patchAlbum,
  deleteAlbum,
  postAlbumFiles,
  deleteAlbumFiles,
} from '../controllers/album.controller';
import { validateToken } from '../middlewares/auth';

const router = Router();

router.get('/', validateToken(true), getAlbums);
router.get('/:id', validateToken(true), getAlbum);
router.post('/', validateToken(), postAlbum);
router.patch('/:id', validateToken(), patchAlbum);
router.delete('/:id', validateToken(), deleteAlbum);
router.post('/:id/files', validateToken(), postAlbumFiles);
router.delete('/:albumId/files/:fileId', validateToken(), deleteAlbumFiles);

export default router;
