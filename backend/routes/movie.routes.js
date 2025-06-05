import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller.js';

import { authenticate, authorizeRoles } from '../middleware/authmiddleware.js';

const router = express.Router();
router.get('/',authenticate, getAllMovies);

router.post('/',authenticate,authorizeRoles, createMovie);
router.get('/:id',authenticate, getMovieById);
router.put('/:id',authenticate,authorizeRoles, updateMovie);
router.delete('/:id',authenticate,authorizeRoles, deleteMovie);

export default router;
