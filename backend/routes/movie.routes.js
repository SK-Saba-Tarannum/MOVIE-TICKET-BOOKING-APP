import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller.js';
// import * as movieController from "../controllers.controller.js"

import { authenticate, authorizeRoles } from '../middleware/authmiddleware.js';

const router = express.Router();
router.get('/',authenticate, getAllMovies);

router.post('/',authenticate,authorizeRoles('ADMIN'), createMovie);
router.get('/:id',authenticate, getMovieById);
router.put('/:id',authenticate,authorizeRoles('ADMIN'), updateMovie);
router.delete('/:id',authenticate,authorizeRoles('ADMIN'), deleteMovie);

export default router;



// const express = require('express');
// const router = express.Router();
// const movieController = require('../controllers/movieController');

// You can add role check middleware like isAdmin, isManager, etc., if needed
// router.get('/', movieController.getAllMovies);
// router.get('/:id', movieController.getMovieById);
// router.post('/', movieController.createMovie);
// router.put('/:id', movieController.updateMovie);
// router.delete('/:id', movieController.deleteMovie);

// module.exports = router;
