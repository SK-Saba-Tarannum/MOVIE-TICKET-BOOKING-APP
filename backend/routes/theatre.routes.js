import express from 'express';
import {
  getTheatres,
  getTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre
} from '../controllers/theatre.controller.js';

import { authenticate, authorizeRoles } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getTheatres);
router.get('/:id', getTheatreById);
router.post('/', authenticate, authorizeRoles('ADMIN'), createTheatre);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateTheatre);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteTheatre);

export default router;
