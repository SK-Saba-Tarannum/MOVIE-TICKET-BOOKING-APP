import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const ManagerVerify = () => {
  const [status, setStatus] = useState('checking'); 
  const [message, setMessage] = useState('');
  const [manager, setManager] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const verifyManager = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
        const role = user?.role;
        console.log(role); 

      if (!token || role !== 'MANAGER') {
        setStatus('not_verified');
        setMessage('Access denied. You are not authorized as a manager.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5001/api/managers/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStatus('verified');
        setMessage(res.data.message || 'Manager verification successful.');
        setManager(res.data.manager);
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('not_verified');
        setMessage(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Verification failed. Please contact support.'
        );
      }
    };

    verifyManager();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl border border-teal-500 p-6 max-w-md w-full shadow-lg text-center">
          {status === 'checking' && (
            <p className="text-teal-400 text-xl font-semibold">
              Verifying manager status...
            </p>
          )}

          {status === 'verified' && (
            <>
              <ShieldCheck className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-400">Access Granted</h2>
              <p className="text-gray-300 mt-2">{message}</p>
              {manager && (
                <div className="mt-4 text-sm text-gray-400">
                  <p><strong>Name:</strong> {manager.name}</p>
                  <p><strong>Theatre:</strong> {manager.theatreName}</p>
                  <p><strong>Email:</strong> {manager.email}</p>
                  <button onClick={()=>{navigate("/shows")}} className='bg-teal-400'>Lets Go</button>
                </div>
              )}
            </>
          )}

          {status === 'not_verified' && (
            <>
              <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-red-400">Access Denied</h2>
              <p className="text-gray-400 mt-2">{message}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerVerify;
