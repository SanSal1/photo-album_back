import { Router } from 'express';
import { getAlbums, getAlbum, postAlbum, putAlbum, deleteAlbum } from '../controllers/album.controller';
import { validateToken } from '../middlewares/auth';

const router = Router();

router.get('/', validateToken(true), getAlbums);
router.get('/:id', validateToken(true), getAlbum);
router.post('/', validateToken(), postAlbum);
router.put('/:id', validateToken(), putAlbum);
router.delete('/:id', validateToken(), deleteAlbum);

export default router;
