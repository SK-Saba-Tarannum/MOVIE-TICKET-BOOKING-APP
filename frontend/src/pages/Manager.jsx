import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MonitorSpeaker, Trash2, Plus } from 'lucide-react';
import Navbar from './Navbar';
const Manager = () => {
  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    theatreName: ''
  });

  const fetchManagers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/managers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.managers;
      setManagers(data);
    } catch (error) {
      console.error('Failed to fetch managers', error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/managers/', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert("Manager added successfully");
      setForm({ fullName: '', email: '', phone: '', theatreName: '' });
      fetchManagers();
    } catch (error) {
      console.error('Failed to add manager', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/managers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchManagers();
    } catch (error) {
      console.error('Failed to delete manager', error);
    }
  };


  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-6 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 mb-8 sm:mb-10 text-center">
            Managers Management
          </h1>

          {/* Manager Form */}
          <div className="bg-gray-900 p-5 sm:p-6 md:p-8 rounded-3xl shadow-2xl max-w-full sm:max-w-3xl mx-auto mb-10 border border-teal-500">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-teal-400">
              Add New Manager
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6"
            >
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="p-2 sm:p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white text-sm sm:text-base"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="p-2 sm:p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white text-sm sm:text-base"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="p-2 sm:p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white text-sm sm:text-base"
              />
              <input
                type="text"
                name="theatreName"
                value={form.theatreName}
                onChange={handleChange}
                placeholder="Theatre Name"
                required
                className="p-2 sm:p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white text-sm sm:text-base"
              />
              <button
                type="submit"
                className="col-span-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 text-sm sm:text-base transition"
              >
                <Plus size={18} />
                Add Manager
              </button>
            </form>
          </div>

          {/* Manager List */}
          <div className="max-w-full sm:max-w-6xl mx-auto space-y-5 sm:space-y-6">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className="bg-gray-900 rounded-3xl shadow-lg border border-teal-500 hover:shadow-xl transition p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 w-full sm:w-auto overflow-hidden">
                  <div className="min-w-[140px] flex items-center space-x-2 shrink-0 py-0">
                    <User className="text-teal-400 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-bold text-teal-400 truncate">
                      {manager.fullName}
                    </h3>
                  </div>
                  <div className="min-w-[110px] flex items-center space-x-2 shrink-0">
                    <Mail className="text-gray-400 w-4 h-4" />
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{manager.email}</p>
                  </div>
                  <div className="min-w-[110px] flex items-center space-x-2 shrink-0">
                    <Phone className="text-gray-400 w-4 h-4" />
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{manager.phone}</p>
                  </div>
                  <div className="min-w-[130px] flex items-center space-x-2 shrink-0">
                    <MonitorSpeaker className="text-gray-400 w-4 h-4" />
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{manager.theatreName}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(manager.id)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-1 px-5 font-semibold transition self-start sm:self-auto flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                  aria-label={`Delete manager ${manager.fullName}`}
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        </>
      );
};

export default Manager;


