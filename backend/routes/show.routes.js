import express from 'express';
import * as showController from '../controllers/show.controller.js';
import { authenticate, authorizeRoles } from '../middleware/authmiddleware.js';
import { getShowsForMovie } from '../controllers/show.controller.js';
import { getTheatresForMovie } from '../controllers/show.controller.js';
import { getShowsByMovieTheatreAndDate } from '../controllers/show.controller.js';
import { getManagerShows } from '../controllers/show.controller.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('MANAGER'), showController.createShow);

router.get('/', authenticate, showController.getAllShows);

router.get('/movie/:movieId', authenticate, getShowsForMovie);
router.get('/theatres/:movieId', authenticate, getTheatresForMovie);
router.get('/manager/shows', authenticate, authorizeRoles('MANAGER'), getManagerShows);

router.get('/:movieId/:theatreId', authenticate, getShowsByMovieTheatreAndDate);

router.get('/:id', authenticate, showController.getShowById);

router.put('/:id', authenticate, authorizeRoles( 'MANAGER'), showController.updateShow);

router.delete('/:id', authenticate, authorizeRoles('MANAGER'), showController.deleteShow);


export default router;


