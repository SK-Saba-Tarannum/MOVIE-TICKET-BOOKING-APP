import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; 
import Navbar from './Navbar';
const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl  text-center  font-bold text-teal-400 mb-6 max-w-6xl mx-auto">
        Users Management
      </h1>

      <div className="max-w-5xl mx-auto space-y-4">
        {users.map((user) => (
          <div
          key={user.id}
          className="bg-gray-900 rounded-2xl shadow-md border border-teal-500 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center flex-1">
            <h3 className="text-lg font-bold text-teal-400 min-w-[150px] truncate"><span className='text-gray-400 px-3'>{`${user.id}`}</span>  {`${user.name}`}</h3>
            <p className="text-sm text-gray-300 min-w-[250px] truncate">{user.email}</p>
            <p className="text-sm text-gray-400 min-w-[120px]"> {user.role || 'N/A'}</p>
          </div>
        
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white flex items-center gap-2 self-start sm:self-auto"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
        
        ))}
      </div>
    </div>
    </>
  );
};

export default UsersList;
