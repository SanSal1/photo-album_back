import { Router } from 'express';
import { postFile } from '../controllers/file.controller';
import { validateToken } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = Router();

router.post('/', validateToken(), upload.single('image'), postFile);

export default router;
