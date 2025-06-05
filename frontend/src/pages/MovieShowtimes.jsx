import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {
  FaClock,
  FaCalendarAlt,
  FaChair,
  FaRupeeSign,
  FaTheaterMasks,
} from 'react-icons/fa';

const MovieShowtimes = () => {
  const { movieId, theatreId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShows = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `http://localhost:5001/api/shows/${movieId}/${theatreId}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShows(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load showtimes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [movieId, theatreId, date]);

  const handleBook = (showId) => {
    navigate(`/booking/${showId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0e0e0e]  text-white px-4 md:px-10 py-12">
        
        <div className="mb-10 bg-gray-900  rounded-2xl p-4 border-teal-400 border-2  flex justify-between items-center gap-4">
          <h1 className="text-2xl font-sans font-semibold text-teal-500 text-center  tracking-tight">
          Show Times
            </h1>

          <input
            id="date"
            type="date"
            className="bg-gray-600 text-white px-4 py-2 rounded-md border border-teal-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading shows...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : shows.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No shows available for this date.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shows.map((show) => (
              <div
                key={show.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
                  {show.movie.title}
                </h2>

                <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-teal-400" />
                    {show.time}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-teal-400" />
                    {new Date(show.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaChair className="text-teal-400" />
                    {show.availableSeats}/{show.totalSeats}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-teal-400" />
                    ₹{show.pricePerSeat}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaTheaterMasks className="text-teal-400" />
                    {show.theatre.name}
                  </div>
                </div>

                <button
                  onClick={() => handleBook(show.id)}
                  className="w-full bg-teal-500  text-white   font-bold py-2 rounded-md hover:bg-teal-400 transition-colors duration-200"
                >
                  Book Now
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </>
  );
};

export default MovieShowtimes;
