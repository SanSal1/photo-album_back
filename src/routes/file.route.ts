import { Router } from 'express';
import { postFile, getFile, getFilesData } from '../controllers/file.controller';
import { validateToken } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = Router();

router.get('/', validateToken(), getFilesData);
router.get('/:id', validateToken(), getFile);
router.post('/', validateToken(), upload.single('image'), postFile);

export default router;
