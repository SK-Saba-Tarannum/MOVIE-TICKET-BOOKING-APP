import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../pages/Navbar';

const MovieShows = () => {
  const { movieId } = useParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchShows = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/shows/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShows(res.data);
      } catch (err) {
        console.error("Failed to fetch shows:", err);
        setError("Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [movieId]);

  if (loading) return <p className="text-white text-center mt-10">Loading shows...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-teal-400 mb-8 text-center">Theatres Showing This Movie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shows.map((show) => (
          <div key={show.id} className="bg-gray-800 p-6 rounded-xl border border-teal-500 shadow-md">
            <p className="mb-2"><span className="font-bold text-teal-400">Theatre Name:</span> {show.theatre.name}</p>
            <p className="mb-2"><span className="font-bold text-teal-400">Location:</span> {show.theatre.location}</p>
            <p className="mb-2"><span className="font-bold text-teal-400">Date:</span> {new Date(show.date).toLocaleDateString()}</p>
            <p className="mb-2"><span className="font-bold text-teal-400">Time:</span> {show.time}</p>
            <p className="mb-2"><span className="font-bold text-teal-400">Price per Seat:</span> ₹{show.pricePerSeat}</p>
            <p className="mb-2"><span className="font-bold text-teal-400">Available Seats:</span> {show.availableSeats}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MovieShows;
