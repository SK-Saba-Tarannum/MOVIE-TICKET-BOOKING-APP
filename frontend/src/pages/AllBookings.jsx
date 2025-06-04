import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Ticket,
  User,
  Film,
  MapPin,
  CreditCard,
  CalendarClock,
  BookOpen,
} from 'lucide-react';
import {
  FaChair,
  FaRupeeSign,
} from 'react-icons/fa';

import Navbar from './Navbar';

const ITEMS_PER_PAGE = 6  ; // Customize how many bookings per page

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/bookings/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings', err));
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  // Get bookings for current page
  const currentBookings = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handler for page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white p-6">
        <h1 className="text-3xl text-center font-bold text-teal-400 mb-6 max-w-6xl mx-auto flex items-center justify-center gap-2">
          <BookOpen className="w-7 h-7 text-teal-400" />
          All Bookings
        </h1>

        <div className="max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full text-sm md:text-base border-collapse bg-gray-900 shadow-xl rounded-xl overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">
                  <User className="inline mr-1" /> User
                </th>
                <th className="px-4 py-3 text-left">
                  <Film className="inline mr-1" /> Movie
                </th>
                <th className="px-4 py-3 text-left">
                  <MapPin className="inline mr-1" /> Theater
                </th>
                <th className="px-4 py-3 text-left">
                  <FaChair className="inline mr-2" />Seats
                </th>
                <th className="px-4 py-3 text-left">
                  <FaRupeeSign className="inline mr-1" /> Amount
                </th>
                <th className="px-4 py-3 text-left">
                  <CreditCard className="inline mr-1" /> Payment
                </th>
                <th className="px-4 py-3 text-left">
                  <CalendarClock className="inline mr-1" /> Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-400 bg-gray-800"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                currentBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="even:bg-gray-800 hover:bg-gray-700 transition duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-teal-400">
                      {b.user?.name || 'N/A'}
                      <br />
                      <span className="text-sm text-gray-400">
                        {b.user?.email || 'No email'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{b.show?.movie?.title || '—'}</td>
                    <td className="px-4 py-3">{b.show?.theatre?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-200">
                      {b.seats?.join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3 text-green-400">
                      ₹{b.amount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {b.payment?.method || 'Not Paid'}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleString()
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-3 mt-6 text-white select-none">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    isActive
                      ? 'bg-teal-400 text-gray-900 font-bold'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBookings;
