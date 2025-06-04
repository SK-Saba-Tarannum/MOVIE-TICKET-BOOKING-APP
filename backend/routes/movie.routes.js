import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller.js';

import { authenticate, authorizeRoles } from '../middleware/authmiddleware.js';
// import { getMovieById } from '../controllers/movie.controller.js';

const router = express.Router();
router.get('/',authenticate, getAllMovies);

// router.use(authenticate);
// router.use(authorizeRoles('ADMIN'));

router.post('/',authenticate,authorizeRoles, createMovie);
router.get('/:id',authenticate, getMovieById);
router.put('/:id',authenticate,authorizeRoles, updateMovie);
router.delete('/:id',authenticate,authorizeRoles, deleteMovie);

export default router;
