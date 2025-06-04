// const express = require('express');
// const router = express.Router();
// const { createBooking, getBookedSeats } = require('../controllers/booking.controller');
// const authenticate = require('../middleware/authenticate');

// router.get('/seats/:showId', authenticate, getBookedSeats);
// router.post('/', authenticate, createBooking);

// module.exports = router;
// import express from 'express';
// import { authenticate } from '../middleware/authmiddleware.js'
// import { getBookedSeats, createBooking } from '../controllers/booking.controller.js';

// const router = express.Router();

// router.get('/seats/:showId', authenticate, getBookedSeats);
// router.post('/', authenticate, createBooking);

// export default router;



import express from 'express';
import { createBooking, getBookingHistory,  getBookedSeats, updateBooking,deleteBooking} from '../controllers/booking.controller.js';
import {authenticate} from '../middleware/authmiddleware.js';
import { fetchAllBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/history', authenticate, getBookingHistory);
router.get('/seats/:showId', authenticate, getBookedSeats);
router.put('/:bookingId', authenticate, updateBooking);     // Edit booking
router.delete('/:bookingId', authenticate, deleteBooking);  // Delete booking
router.get('/all', fetchAllBookings);

export default router;
