import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Pencil, X } from 'lucide-react';
import Navbar from './Navbar';

const Theatre = () => {
  const [theatres, setTheatres] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', contact: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTheatres = async () => {
    try {
      const res = await axios.get('https://movie-ticket-booking-app-2.onrender.com/api/theatres', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTheatres(res.data);
    } catch (err) {
      console.error('Failed to fetch theatres:', err);
    }
  };

  useEffect(() => {
    fetchTheatres();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setForm({ name: '', location: '', contact: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (theatre) => {
    setForm({ name: theatre.name, location: theatre.location, contact: theatre.contact || '' });
    setEditingId(theatre.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      if (editingId) {
        await axios.put(`https://movie-ticket-booking-app-2.onrender.com/api/theatres/${editingId}`, form, { headers });
      } else {
        await axios.post('https://movie-ticket-booking-app-2.onrender.com/api/theatres', form, { headers });
      }

      setForm({ name: '', location: '', contact: '' });
      setEditingId(null);
      setShowModal(false);
      fetchTheatres();
    } catch (err) {
      console.error('Error saving theatre:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://movie-ticket-booking-app-2.onrender.com/api/theatres/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTheatres();
    } catch (err) {
      console.error('Failed to delete theatre:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-400 text-center sm:text-left">
            Theatres Management
          </h1>
          <button
            onClick={openAddModal}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap shadow-md transition-colors duration-200"
          >
            <Plus size={18} />
            Add Theatre
          </button>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {theatres.map((theatre) => (
            <div
              key={theatre.id}
              className="bg-gray-900 rounded-2xl shadow-md border border-teal-500 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base text-white">{`Theater ID : ${theatre.id}`}</h3>
                <h3 className="text-lg sm:text-xl font-bold text-teal-400">{theatre.name}</h3>
                <p className="text-sm text-gray-300">{theatre.location}</p>
                <p className="text-sm text-gray-400">{theatre.contact || 'No contact'}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-wrap gap-3">
                <button
                  onClick={() => handleEdit(theatre)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg text-sm text-white flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(theatre.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm text-white flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4 overflow-auto">
            <div className="bg-gray-900 border border-teal-500 rounded-2xl shadow-xl w-full max-w-md p-6 relative my-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-teal-400 text-center">
                {editingId ? 'Edit Theatre' : 'Add New Theatre'}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Theatre Name"
                  required
                  className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white w-full"
                />
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Contact (optional)"
                  className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white w-full"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md px-5 py-3"
                >
                  {editingId ? 'Update Theatre' : 'Add Theatre'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Theatre;
