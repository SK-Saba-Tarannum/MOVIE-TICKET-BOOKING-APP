import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  User,
  Mail,
  Ticket,
  Users,
  IndianRupee,
  BadgeCheck,
  Film,
  Landmark,
  CalendarClock,
  AlertCircle,
} from 'lucide-react';
import Navbar from './Navbar';

const ManagerShowBookings = () => {
  const { showId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(
          `http://localhost:5001/api/bookings/manager/show/${showId}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data || []);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [showId]);

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-teal-400 mb-8 text-center">
        Bookings for Show ID : {showId}
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-12 flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-red-500" />
          No bookings found for this show.
        </div>
      ) : (
        <div className="overflow-x-auto border border-teal-600 rounded-2xl">
          <table className="min-w-full table-auto text-sm bg-gray-800 rounded-xl overflow-hidden">
            <thead className="bg-teal-600 text-white text-left">
              <tr>
                <th className="px-4 py-3"><User className="inline mr-2 w-4 h-4" />User</th>
                <th className="px-4 py-3"><Mail className="inline mr-2 w-4 h-4" />Email</th>
                <th className="px-4 py-3"><Ticket className="inline mr-2 w-4 h-4" />Seats</th>
                <th className="px-4 py-3"><Users className="inline mr-2 w-4 h-4" />Total</th>
                <th className="px-4 py-3"><IndianRupee className="inline mr-2 w-4 h-4" />Amount</th>
                <th className="px-4 py-3"><BadgeCheck className="inline mr-2 w-4 h-4" />Status</th>
                <th className="px-4 py-3"><Film className="inline mr-2 w-4 h-4" />Movie</th>
                <th className="px-4 py-3"><Landmark className="inline mr-2 w-4 h-4" />Theatre</th>
                <th className="px-4 py-3"><CalendarClock className="inline mr-2 w-4 h-4" />Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                  <td className="px-4 py-2">{b.user.name}</td>
                  <td className="px-4 py-2">{b.user.email}</td>
                  <td className="px-4 py-2">{b.seats.join(', ')}</td>
                  <td className="px-4 py-2">{b.numSeats}</td>
                  <td className="px-4 py-2">₹{b.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-semibold ${
                        b.payment?.status === 'PAID' ? 'text-green-400' : 'text-red-500'
                      }`}
                    >
                      {b.payment?.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{b.show.movie.title}</td>
                  <td className="px-4 py-2">{b.show.theatre.name}</td>
                  <td className="px-4 py-2">{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default ManagerShowBookings;
