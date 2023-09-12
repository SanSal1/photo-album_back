import { Router } from 'express';
import { postCredentials } from '../controllers/login.controller';

const router = Router();

router.post('/', postCredentials);

export default router;
