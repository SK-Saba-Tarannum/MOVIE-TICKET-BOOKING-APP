// import { useNavigate } from 'react-router-dom';
// import { User,LogIn,BookOpen } from 'lucide-react'; // import login/user icon

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-gray-900 text-white py-1 px-6 flex justify-between items-center shadow-teal-500 border-b border-teal-500">
//       {/* Logo */}
//       <button
//         onClick={() => navigate('/')}
//         className="flex items-center gap-2 text-2xl font-bold text-teal-400 focus:outline-none"
//       >
//         <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
//         <span className="hidden sm:inline">MovieMania</span>
//       </button>

//       {/* Login Button with icon */}
//       <div className='flex  gap-4' >
//       <button
//         onClick={() => navigate('/booking/history')}
//         className="bg-teal-500 hover:bg-teal-600 text-gray-600 font-semibold py-2 px-4 rounded-md transition flex items-center gap-2"
//       >
//         {/* <User size={18} /> */}
//         <BookOpen size={18} />

//       </button>
//       <button
//         onClick={() => navigate('/')}
//         className="bg-teal-500 hover:bg-teal-600 text-gray-600 font-semibold py-2 px-4 rounded-md transition flex items-center gap-2"
//       >
//         <User size={18} />
//         <LogIn size={18} />

//       </button>
      
//       </div>
      
      
//     </nav>
//   );
// };

// export default Navbar;


import { useNavigate } from 'react-router-dom';
import { User, LogIn, BookOpen } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white py-1 px-6 flex justify-between items-center shadow-md border-b border-teal-500">
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-2xl font-bold text-teal-400 focus:outline-none"
      >
        <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
        <span className="hidden sm:inline">MovieMania</span>
      </button>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {/* <button
          onClick={() => navigate('/booking/history')}
          className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition flex items-center gap-2"
        >
          <BookOpen size={18} />
          <span className="hidden sm:inline">History</span>
        </button> */}

        <button
          onClick={() => navigate('/')}
          className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition flex items-center gap-2"
        >
          <User size={18} />
          {/* <span className="hidden sm:inline">Login</span> */}
          <LogIn size={18} />

        </button>
      </div>
    </nav>
  );
};

export default Navbar;
