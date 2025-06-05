import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchShows = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/shows/', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setShows(Array.isArray(res.data) ? res.data : res.data.shows || []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load shows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">All Shows</h2>
            <div className='flex flex-row gap-3'>
            <button
              onClick={() => navigate('/manager/shows')}
              className="bg-teal-300 text-black px-2 py-2 rounded-b-md font-semibold hover:bg-gray-300 transition"
            >
              My Shows
            </button>
            <button
              onClick={() => navigate('/movies')}
              className="bg-teal-300 text-black px-2 py-2 rounded-b-md font-semibold hover:bg-gray-300 transition"
            >
              Movies Avilable
            </button>
            </div>

          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading shows...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-teal-500">
              {shows.length === 0 ? (
                <p className="text-gray-400 text-center p-4">No shows found</p>
              ) : (
                <table className="min-w-full text-sm text-left text-white bg-gray-900">
                  <thead className="bg-teal-500 text-white">
                    <tr>
                      <th className="px-4 py-3">Poster</th>
                      <th className="px-4 py-3">Movie</th>
                      <th className="px-4 py-3">Theatre</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Total Seats</th>
                      <th className="px-4 py-3">Available</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shows.map((show) => (
                      <tr key={show.id} className="border-t border-teal-500 hover:bg-gray-800 transition">
                        <td className="px-4 py-3">
                          <img
                            src={show.movie?.poster || ''}
                            alt={show.movie?.title || 'Poster'}
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-3">{show.movie?.title || 'N/A'}</td>
                        <td className="px-4 py-3">{show.theatre?.name || 'N/A'}</td>
                        <td className="px-4 py-3">{new Date(show.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">{show.time}</td>
                        <td className="px-4 py-3">{show.totalSeats}</td>
                        <td className="px-4 py-3">{show.availableSeats}</td>
                        <td className="px-4 py-3">₹{show.pricePerSeat.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedMovie(show.movie)}
                            className="text-teal-400 hover:underline"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        
          {selectedMovie && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md relative border border-teal-500">
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-2 right-3 text-white text-xl hover:text-teal-400"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold text-teal-400 mb-4">{selectedMovie.title}</h2>
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <p className="mb-2"><strong>MovieID: </strong> {selectedMovie.id}</p>

                <p className="mb-2"><strong>Description:</strong> {selectedMovie.description}</p>
                <p className="mb-2"><strong>Language:</strong> {selectedMovie.language}</p>
                <p className="mb-2"><strong>Genre:</strong> {selectedMovie.genre}</p>
                <p className="mb-2"><strong>Release Date:</strong> {new Date(selectedMovie.releaseDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {selectedMovie.duration} min</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shows;
