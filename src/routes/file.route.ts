import { Router } from 'express';
import { postFile, getFile, getFiles, deleteFile } from '../controllers/file.controller';
import { validateToken } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = Router();

router.get('/', validateToken(true), getFiles);
router.get('/:id', validateToken(true), getFile);
router.post('/', validateToken(), upload.single('image'), postFile);
router.delete('/:id', validateToken(), deleteFile);

export default router;
