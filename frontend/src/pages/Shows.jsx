import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Navbar from "./Navbar"
const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: null,
    movieId: '',
    theatreId: '',
    date: '',
    time: '',
    totalSeats: '',
    availableSeats: '',
    pricePerSeat: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token');

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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      movieId: '',
      theatreId: '',
      date: '',
      time: '',
      totalSeats: '',
      availableSeats: '',
      pricePerSeat: '',
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      movieId: Number(form.movieId),
      theatreId: Number(form.theatreId),
      date: form.date,
      time: form.time,
      totalSeats: Number(form.totalSeats),
      availableSeats: Number(form.availableSeats),
      pricePerSeat: parseFloat(form.pricePerSeat),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/shows/${form.id}`, payload, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
      } else {
        await axios.post('http://localhost:5001/api/shows/', payload, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
      }
      resetForm();
      fetchShows();
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save show');
    }
  };

  const handleEdit = show => {
    setForm({
      id: show.id,
      movieId: show.movieId,
      theatreId: show.theatreId,
      date: show.date.split('T')[0],
      time: show.time,
      totalSeats: show.totalSeats,
      availableSeats: show.availableSeats,
      pricePerSeat: show.pricePerSeat,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this show?')) {
      try {
        await axios.delete(`http://localhost:5001/api/shows/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        fetchShows();
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete show');
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Shows</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Add Show
          </button>
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
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shows.map(show => (
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
                      <td className="px-4 py-3 mt-3 flex justify-center align-middle gap-2">
                        <button
                          onClick={() => handleEdit(show)}
                          className="bg-white text-black px-2 py-1 rounded hover:bg-gray-300 flex items-center gap-1"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(show.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-white"
            >
              {[
                { name: 'movieId', placeholder: 'Movie ID', type: 'number' },
                { name: 'theatreId', placeholder: 'Theatre ID', type: 'number' },
                { name: 'date', placeholder: 'Date', type: 'date' },
                { name: 'time', placeholder: 'Time (e.g. 18:30)', type: 'text' },
                { name: 'totalSeats', placeholder: 'Total Seats', type: 'number' },
                { name: 'availableSeats', placeholder: 'Available Seats', type: 'number' },
                { name: 'pricePerSeat', placeholder: 'Price per Seat', type: 'number', step: '0.01' },
              ].map(({ name, placeholder, type, step }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  step={step}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-600 text-white placeholder-teal-400 focus:outline-none focus:border-teal-400"
                />
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  {isEditing ? 'Update Show' : 'Add Show'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Shows;
