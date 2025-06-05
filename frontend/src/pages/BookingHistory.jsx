import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../pages/Navbar';
import { useNavigate } from 'react-router-dom';
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editInput, setEditInput] = useState('');
  const navigate= useNavigate();
  const token = localStorage.getItem('token');
 
  const fetchBookings = async () => {
    try {
      const res = await axios.get('https://movie-ticket-booking-app-2.onrender.com/api/bookings/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to fetch bookings');
      console.log(err)

    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://movie-ticket-booking-app-2.onrender.com/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Booking deleted');
      fetchBookings();
    } catch (err) {
      toast.error('Delete failed');
      console.log(err)
    }
  };

  const handleEdit = async (booking) => {
    try {
      const updatedSeats = editInput.split(',').map(seat => seat.trim());
      const numSeats = updatedSeats.length;
      const amount = booking.show.pricePerSeat * numSeats;

      await axios.put(
        `https://movie-ticket-booking-app-2.onrender.com/api/bookings/${booking.id}`,
        { seats: updatedSeats, numSeats, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Booking updated');
      setEditMode(null);
      setEditInput('');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="min-h-screen bg-[#0e0e0e] text-white p-4 sm:p-6">
        <div>
        <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">My Booking History</h2>
        
        </div>
        <></>
        <div className="max-w-5xl mx-auto space-y-4">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">You have no bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-teal-400 rounded-lg p-4 bg-gray-900 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div className="space-y-1 text-sm sm:text-base">
                  <p className='text-red-400'>
                    <span className="text-teal-300 font-semibold">Show:</span> {booking.show.movie.title}
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Date:</span>{' '}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Seats:</span>{' '}
                    {editMode === booking.id ? (
                      <input
                        className="text-white p-1 rounded w-full max-w-sm"
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                      />
                    ) : (
                      booking.seats.join(', ')
                    )}
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Amount:</span> ₹{booking.amount}
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Payment:</span>{' '}
                    {booking.payment?.method} | ₹{booking.payment?.amount}
                  </p>
                </div>
                <div className="space-x-2">
                  {editMode === booking.id ? (
                    <>

                      <button
                        onClick={() => handleEdit(booking)}
                        className="bg-green-300 text-black px-3 py-1 rounded hover:bg-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(null);
                          setEditInput('');
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                    <button className='text-black bg-gray-300 px-3 py-1 rounded hover:bg-gray-400' onClick={()=>{navigate(`/booking/${booking.show.id}`)}}>Check seats</button>

                      <button
                        onClick={() => {
                          setEditMode(booking.id);
                          setEditInput(booking.seats.join(', '));
                        }}
                        className="bg-teal-500 text-black px-3 py-1 rounded hover:bg-teal-400"
                      >
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BookingHistory;






