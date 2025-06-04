import express from 'express';
const router = express.Router();
import {
    createManager,
    getAllManagers,
    updateManager,
    deleteManager,
    verifyManager } from '../controllers/manager.controller.js';
import { authenticate,authorizeRoles } from '../middleware/authmiddleware.js';
  

router.post('/',authenticate,authorizeRoles('ADMIN'), createManager);
router.get('/',authenticate,authorizeRoles('ADMIN'), getAllManagers);
router.put('/:id',authenticate,authorizeRoles('ADMIN'), updateManager);
router.delete('/:id',authenticate,authorizeRoles('ADMIN'), deleteManager);
router.get('/verify', authenticate, verifyManager);


export default router;


