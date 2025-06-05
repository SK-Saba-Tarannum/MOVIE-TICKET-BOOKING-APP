import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://movie-ticket-booking-app-2.onrender.com/api/movies', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setMovies(res.data);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading movies...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-[#121212] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-teal-400 text-center">All Movies</h2>
      <div className="overflow-x-auto rounded-xl border border-teal-500 shadow-lg">
        <table className="min-w-full text-sm bg-gray-900 text-left">
          <thead className="bg-teal-600 text-white">
            <tr>
            <th className="px-4 py-3">MovieID</th>

              <th className="px-4 py-3">Poster</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Release Date</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-t border-teal-500 hover:bg-gray-800 transition">
                <td className="px-4 py-3 font-medium text-red-400">{movie.id}</td>

                <td className="px-4 py-3">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-red-400">{movie.title}</td>
                <td className="px-4 py-3 text-gray-300">{movie.language || 'N/A'}</td>
                <td className="px-4 py-3 text-gray-300">
                  {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-3 text-gray-300">{movie.duration || 'N/A'}</td>
                <td className="px-4 py-3 text-gray-300">{movie.genre || 'N/A'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    className="text-teal-400 hover:underline hover:text-teal-300"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {movies.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No movies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movies;
