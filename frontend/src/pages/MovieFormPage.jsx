import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://movie-ticket-booking-app-2.onrender.com/api/movies/';

const MovieFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '',
    genre: '',
    language: '',
    releaseDate: '',
    poster: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
    
      const fetchMovie = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${API_URL}${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const movie = res.data;
          setForm({
            title: movie.title || '',
            description: movie.description || '',
            duration: movie.duration || '',
            genre: movie.genre || '',
            language: movie.language || '',
            releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
            poster: movie.poster || '',
          });
        } catch (err) {
          console.error('Failed to fetch movie:', err);
        }
      };
      fetchMovie();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const preparedForm = {
        ...form,
        duration: Number(form.duration),
        releaseDate: new Date(form.releaseDate),
      };
      console.log('Sending data to API:', preparedForm);
  
      const response = await axios.post(API_URL, preparedForm, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
      });
      console.log('API response:', response.data);
      navigate('/moviespage');
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.error('Request timed out');
      } else {
        console.error('Error saving movie:', err.response?.data || err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-teal-400">{id ? 'Edit Movie' : 'Add Movie'}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-lg space-y-4">
        {['title', 'description', 'genre', 'language', 'poster'].map((field) => (
          <input
            key={field}
            name={field}
            type="text"
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
            required
          />
        ))}
        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
          required
        />
        <input
          name="releaseDate"
          type="date"
          value={form.releaseDate}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
          required
        />
        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/moviespage')}
            className="flex-1 px-4 py-3 rounded-md bg-gray-700 hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 rounded-md text-white"
            disabled={loading}
          >
            {loading ? 'Saving...' : id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieFormPage;
