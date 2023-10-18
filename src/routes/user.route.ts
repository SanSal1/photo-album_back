import { Router } from 'express';
import { getUsers, getUser, getProfile, postUser, deleteUser } from '../controllers/user.controller';
import { isAdmin, validateToken } from '../middlewares/auth';

const router = Router();

router.get('/', validateToken(), isAdmin, getUsers);
router.get('/profile', validateToken(), getProfile);
router.get('/:id', validateToken(), isAdmin, getUser);
router.post('/', postUser);
router.delete('/:id', validateToken(), isAdmin, deleteUser);

export default router;
