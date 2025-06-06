import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const MovieCard = ({ movie, onEdit, onDelete }) => (
  <div className="bg-gray-800 p-5 rounded-2xl shadow-xl text-white relative">
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-full h-52 object-cover rounded-xl mb-3"
    />
    <h3 className="text-xl font-bold text-teal-400">{movie.title}</h3>
    <p className="text-gray-300 italic">
      {movie.genre} | {movie.language}
    </p>
    <p className="text-white/90 mt-2 sm:line-clamp-1">{movie.description}</p>
    <div className="text-sm text-gray-300 mt-2 sm:mb-6">
      Duration: {movie.duration} min<br />
      Released Date: {new Date(movie.releaseDate).toLocaleDateString()}
    </div>
    <div className="absolute bottom-3 flex right-3 space-x-2">
      <button
        onClick={() => onEdit(movie)}
        className="bg-teal-400 flex text-black gap-1 hover:bg-teal-600 px-3 py-1 rounded-md text-sm"
      >
        <Edit2 size={18} /> Edit
      </button>
      <button
        onClick={() => onDelete(movie.id)}
        className="bg-red-400 flex gap-1 text-black hover:bg-teal-700 px-3 py-1 rounded-md text-sm"
      >
        <Trash2 size={18} /> Delete
      </button>
    </div>
  </div>
);

export default MovieCard;
