import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from './Navbar';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios
      .get(`https://movie-ticket-booking-app-2.onrender.com/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMovie(res.data);
        setError('');
      })
      .catch((err) => {
        setError('Unauthorized or movie not found');
        console.error(err);
      });
  }, [movieId]);

  const handleBookShow = () => {
    navigate(`/movie/${movieId}/theatres`);
  };

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!movie) return <div className="p-6 text-white">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl border-teal-500 border-2 shadow-lg p-6">
        <h1 className="text-4xl font-bold text-red-500 mb-4">{movie.title}</h1>
        {movie.poster && (
          <img
            src={`/${movie.poster}`}
            alt={movie.title}
            className="w-full h-72 object-cover rounded mb-6"
          />
        )}
        <p className="text-lg text-gray-300 mb-4">{movie.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 mb-6">
          <p><span className="text-white font-semibold">Language:</span> {movie.language}</p>
          <p><span className="text-white font-semibold">Duration:</span> {movie.duration} mins</p>
          <p><span className="text-white font-semibold">Genre:</span> {movie.genre}</p>
          <p><span className="text-white font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>

        <button
          onClick={handleBookShow}
          className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-3 rounded-md transition"
        >
          Book Show
        </button>
      </div>
    </div>
    </>
  );
};

export default MovieDetails;
