import { Router } from 'express'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/create', addUser);
router.put('/update/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;