import express from 'express';
import { createBooking, getBookingHistory,  getBookedSeats, updateBooking,deleteBooking} from '../controllers/booking.controller.js';
import {authenticate,authorizeRoles} from '../middleware/authmiddleware.js';
import { fetchAllBookings } from '../controllers/booking.controller.js';
import { getManagerShowBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/history', authenticate, getBookingHistory);
router.get('/seats/:showId', authenticate, getBookedSeats);
router.put('/:bookingId', authenticate, updateBooking);     
router.delete('/:bookingId', authenticate, deleteBooking);  
router.get('/all', fetchAllBookings);
router.get('/manager/show/:showId/bookings', authenticate, authorizeRoles('MANAGER'), getManagerShowBookings);

export default router;
