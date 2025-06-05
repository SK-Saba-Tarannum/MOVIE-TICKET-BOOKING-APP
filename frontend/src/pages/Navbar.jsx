import { useNavigate } from 'react-router-dom';
import { User, LogIn, BookOpen } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white py-1 px-6 flex justify-between items-center shadow-md border-b border-teal-500">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-2xl font-bold text-teal-400 focus:outline-none"
      >
        <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
        <span className="hidden sm:inline">MovieMania</span>
      </button>

      <div className="flex gap-4">
        
        <button
          onClick={() => navigate('/')}
          className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition flex items-center gap-2"
        >
          <User size={18} />
          <LogIn size={18} />

        </button>
      </div>
    </nav>
  );
};

export default Navbar;
