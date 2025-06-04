import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password || !role) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup', {
        name,
        email,
        password,
        role: role.toUpperCase(), 
      });
  
      if (res.status === 201 || res.status === 200) {
        toast.success('Registration successful!', {
          position: 'top-right',
          autoClose: 3000,
        });
  
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
  
        setTimeout(() => {
          navigate('/');
        }, 1000); 
      }
    } catch (error) {
      toast.error(`Registration failed: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };
  

  return (
    <div className="flex h-screen justify-center items-center bg-black">
      <div className="border border-teal-400 p-6 rounded-xl shadow-sm bg-gray-900 w-80">
        <h2 className="text-2xl font-bold text-center text-teal-400 mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-1 text-white mb-4 border bg-gray-600 border-teal-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-1 border text-white mb-4 bg-gray-600 border-teal-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-1 border text-white mb-4 bg-gray-600 border-teal-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-1 border text-white mb-4 bg-gray-600 border-teal-300 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>

          </select>
          <button
            type="submit"
            className="w-full bg-teal-400 mb-4 text-white py-2 rounded hover:bg-teal-600 transition"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
          >
            Go to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
