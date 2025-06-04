// import * as bookingService from "../services/booking.service.js"                                

// exports.getBookedSeats = async (req, res) => {
//   try {
//     const showId = parseInt(req.params.showId);
//     const seats = await bookingService.getBookedSeats(showId);
//     res.json(seats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createBooking = async (req, res) => {
//   const userId = req.user.id;
//   const { showId, numSeats, amount, seats } = req.body;

//   try {
//     const booking = await bookingService.createBooking({
//       userId,
//       showId,
//       numSeats,
//       amount,
//       seats,
//     });
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };











// import { getBookedSeats, createBooking } from '../services/booking.service.js';

// import * as bookingService from "../services/booking.service.js";

// export const getBookedSeats = async (req, res) => {
//   try {
//     const showId = parseInt(req.params.showId);
//     const seats = await bookingService.getBookedSeats(showId);
//     res.json(seats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const createBooking = async (req, res) => {
//   const userId = req.user.id;
//   const { showId, numSeats, amount, seats } = req.body;

//   try {
//     const booking = await bookingService.createBooking({
//       userId,
//       showId,
//       numSeats,
//       amount,
//       seats,
//     });
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };






// import { getBookedSeats as getBookedSeatsService, createBooking as createBookingService } from '../services/booking.service.js';

// export const getBookedSeats = async (req, res) => {
//   try {
//     const showId = parseInt(req.params.showId);
//     const seats = await getBookedSeatsService(showId);
//     res.json(seats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const createBooking = async (req, res) => {
//   const userId = req.user.id;
//   const { showId, numSeats, amount, seats } = req.body;

//   try {
//     const booking = await createBookingService({
//       userId,
//       showId,
//       numSeats,
//       amount,
//       seats,
//     });
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// export const createBooking = async (req, res) => {
//     try {
//       const { showId, numSeats, amount, seats, paymentMethod } = req.body;
//       const userId = req.user.id;
  
//       const booking = await bookingService.createBooking({
//         userId,
//         showId,
//         numSeats,
//         amount,
//         seats,
//         paymentMethod,
//       });
  
//       res.status(201).json(booking);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   };
  




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
