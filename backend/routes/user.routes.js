// routes/user.routes.js
import express from 'express';
import { registerUser, getUsers, deleteUser } from '../controllers/user.controller.js';
import { authenticate,authorizeRoles } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/register', registerUser); 
router.get('/', authenticate, authorizeRoles('ADMIN'), getUsers);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteUser);

export default router;
