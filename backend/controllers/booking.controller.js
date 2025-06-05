import { createBookingWithPayment, getUserBookings } from '../services/booking.service.js';
import { getShowSeatData } from '../services/booking.service.js';
import { updateUserBooking, deleteUserBooking } from '../services/booking.service.js';
import { getAllBookings } from '../services/booking.service.js';

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { showId, numSeats, seats, method,amount, upiId, cardNumber, cardExpiry, cardCVV } = req.body;

    const paymentData = {
      method,
      upiId: method === 'UPI' ? upiId : null,
      cardNumber: method === 'Card' ? cardNumber : null,
      cardExpiry: method === 'Card' ? cardExpiry : null,
      cardCVV: method === 'Card' ? cardCVV : null,
    };

    const booking = await createBookingWithPayment({
      userId,
      showId,
      numSeats,
      seats,
      amount,
      paymentData,
    });

    res.status(201).json({ booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBookingHistory = async (req, res) => {
  try {
    const bookings = await getUserBookings(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBookedSeats = async (req, res) => {
  try {
    const seatData = await getShowSeatData(req.params.showId);
    res.json(seatData);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};



export const updateBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = parseInt(req.params.bookingId);
    const { seats, numSeats, amount } = req.body;

    const updated = await updateUserBooking({ userId, bookingId, seats, numSeats, amount });
    res.json({ message: 'Booking updated', booking: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = parseInt(req.params.bookingId);

    await deleteUserBooking({ userId, bookingId });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const fetchAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


import { getBookingsForManagerShow } from '../services/booking.service.js';

export const getManagerShowBookings = async (req, res) => {
  try {
    const { showId } = req.params;
    const managerEmail = req.user.email; 

    const bookings = await getBookingsForManagerShow(managerEmail, parseInt(showId));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
