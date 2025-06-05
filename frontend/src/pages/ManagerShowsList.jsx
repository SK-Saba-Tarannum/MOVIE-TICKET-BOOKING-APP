import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 ,BookOpen } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ManagerShowsList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const navigate=useNavigate()

  const fetchShows = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://movie-ticket-booking-app-2.onrender.com/api/shows/manager/shows', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setShows(res.data);
    } catch (err) {
      console.error('Failed to fetch shows:', err.response?.data || err.message);
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
        await axios.put(`https://movie-ticket-booking-app-2.onrender.com/api/shows/${form.id}`, payload, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
      } else {
        await axios.post('https://movie-ticket-booking-app-2.onrender.com/api/shows/', payload, {
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
        await axios.delete(`https://movie-ticket-booking-app-2.onrender.com/api/shows/${id}`, {
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
      <Navbar />
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-400">Your Theater Shows</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-300"
          >
            Add Show
          </button>
        </div>

        {loading ? (
          <p>Loading shows...</p>
        ) : shows.length === 0 ? (
          <p>No shows found</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-teal-500">
            <table className="min-w-full bg-gray-800 text-white text-left text-sm">
              <thead className="bg-teal-600">
                <tr>
                  <th className="px-4 py-3">Poster</th>
                  <th className="px-4 py-3">Movie</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Available</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Actions</th>
                  <th className="px-4 py-3">Bookings</th>

                </tr>
              </thead>
              <tbody>
                {shows.map(show => (
                  <tr key={show.id} className="border-t border-gray-700 hover:bg-gray-700">
                    <td className="px-4 py-3">
                      <img src={`/${show.movie?.poster}`} alt="Poster" className="w-14 h-10 rounded" />
                    </td>
                    <td className="px-4 py-3">{show.movie?.title || 'N/A'}</td>
                    <td className="px-4 py-3">{new Date(show.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{show.time}</td>
                    <td className="px-4 py-3">{show.availableSeats}</td>
                    <td className="px-4 py-3">{show.totalSeats}</td>
                    <td className="px-4 py-3">₹{show.pricePerSeat}</td>
                    <td className="px-4 py-3">
                    <button
                        onClick={() =>{navigate(`/manager/show/${show.id}/bookings`)}}
                        className='text-red-400 hover:underline flex gap-2 hover:text-teal-300'
                      >
                        <BookOpen className="w-4 h-4 " /> Bookings
                      </button>
                   
                    </td>
                    <td className="px-2 mt-2 py-3 flex gap-2 justify-center align-middle">
                      <button
                        onClick={() => handleEdit(show)}
                        className="bg-white text-black px-2 py-1 rounded hover:bg-gray-300 flex items-center"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(show.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 flex items-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                    

                  </tr>
                ))}
              </tbody>
            </table>
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
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-600 text-white placeholder-teal-400 focus:outline-none"
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
    </>
  );
};

export default ManagerShowsList;
