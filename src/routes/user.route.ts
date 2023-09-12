import { Router } from 'express';
import { getUsers, getUser, postUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);

export default router;
