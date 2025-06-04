// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MoviesList = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/api/movies', {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         setMovies(res.data.slice(0, 5)); // Display only first 5 movies
//       } catch (err) {
//         console.error('Failed to fetch movies:', err);
//         setError('Failed to fetch movies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (loading) return <p className="text-white text-center mt-10">Loading movies...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

//   return (
//     <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6">Top 5 Movies</h2>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {movies.map((movie) => (
//             <div key={movie.id} className="bg-gray-800 p-4 rounded-2xl border border-white shadow-md">
//               <img
//                 src={movie.poster}
//                 alt={movie.title}
//                 className="w-full h-64 object-cover rounded-xl mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
//               <p className="text-gray-300">{movie.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviesList;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../pages/Navbar';
import { useNavigate } from 'react-router-dom';
import {BookOpen} from 'lucide-react'
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/movies', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setMovies(res.data); // Display only first 5 movies
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading movies...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121212] text-white px-4 py-8 sm:px-6 md:px-10 lg:px-20">
      <header className="text-center mb-10 rounded-2xl border-b-1 border-b-teal-400">
        <h1 className="text-3xl font-bold text-teal-500 mb-2">Welcome to MovieMania</h1>
        <p className="text-white mb-2 ">Explore our top featured movies now showing in theaters</p>
        <p className='flex justify-center align-middle gap-6 mb-6'>
          {/* check your  */}
        <button
          onClick={() => navigate('/booking/history')}
          className=" border-b-1  border-b-teal-400 text-center hover:bg-teal-600 text-red-400 font-semibold  transition flex items-center gap-2"
        >
          {/* <BookOpen size={18} /> */}
          <span >   Booking History</span>
        </button>
    
        </p>
        

      </header>

      <section className="max-w-7xl relative mx-auto">
        {/*     <h2 className="text-2xl font-bold text-teal-400 mb-6">Top 5 Movies</h2> */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" >
          {movies.map((movie) => (
            <div key={movie.id}  className="bg-gray-800 p-4 rounded-2xl border border-teal-500 shadow-lg transition-transform transform hover:scale-105">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-52 object-cover rounded-xl mb-4"

                onClick={() => {
                  console.log('Navigating to movie:', movie.id);
                  navigate(`/movies/${movie.id}`);
                }}
                
              />
              <h3 className="text-lg font-semibold text-red-500 mb-2 line-clamp-1">{movie.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3">{movie.description}</p>
            </div>
          ))}
        </div>
        
      </section>
      {/* <div className='flex justify-between align-middle'> */}
      
    </div>
      
    </>
  );
};

export default MoviesList;












