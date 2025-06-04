// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MovieDetails = () => {
//   // const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [error, setError] = useState('');
//   // const { movieId } = useParams();
//   const { movieId } = useParams(); // ✅
//   console.log('movieId from params:', movieId); // 👈 Add this line


//   // useEffect(() => {
//   //   axios
//   //     .get(`http://localhost:5001/api/movies/${id}`) // Update port/path as needed
//   //     .then((res) => {
//   //       setMovie(res.data);
//   //       setError('');
//   //     })
//   //     .catch((err) => {
//   //       setError('Movie not found or server error');
//   //       console.error(err);
//   //     });
//   // }, [id]);

//   useEffect(() => {
//     const token = localStorage.getItem('token'); // or use cookies if you're using them
  
//     axios
//       .get(`http://localhost:5001/api/movies/${movieId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setMovie(res.data);
//         setError('');
//       })
//       .catch((err) => {
//         setError('Unauthorized or movie not found');
//         console.error(err);
//       });
//   }, [movieId]);
  

//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!movie) return <div className="p-6 text-white">Loading...</div>;

//   return (
//     <div className="bg-black text-white min-h-screen p-6">
//       <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6">
//         <h1 className="text-4xl font-bold text-red-500 mb-4">{movie.title}</h1>
//         {movie.poster && (
//           <img
//             src={`/${movie.poster}`}
//             alt={movie.title}
//             className="w-full h-96 object-cover rounded mb-6"
//           />
//         )}
//         <p className="text-lg text-gray-300 mb-4">{movie.description}</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
//           <p><span className="text-white font-semibold">Language:</span> {movie.language}</p>
//           <p><span className="text-white font-semibold">Duration:</span> {movie.duration} mins</p>
//           <p><span className="text-white font-semibold">Genre:</span> {movie.genre}</p>
//           <p><span className="text-white font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;










import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import Navbar from './Navbar';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios
      .get(`http://localhost:5001/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMovie(res.data);
        setError('');
      })
      .catch((err) => {
        setError('Unauthorized or movie not found');
        console.error(err);
      });
  }, [movieId]);

  const handleBookShow = () => {
    // Example: Navigate to booking page with movieId param
    navigate(`/movie/${movieId}/theatres`);
  };

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!movie) return <div className="p-6 text-white">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl border-teal-500 border-2 shadow-lg p-6">
        <h1 className="text-4xl font-bold text-red-500 mb-4">{movie.title}</h1>
        {movie.poster && (
          <img
            src={`/${movie.poster}`}
            alt={movie.title}
            className="w-full h-72 object-cover rounded mb-6"
          />
        )}
        <p className="text-lg text-gray-300 mb-4">{movie.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 mb-6">
          <p><span className="text-white font-semibold">Language:</span> {movie.language}</p>
          <p><span className="text-white font-semibold">Duration:</span> {movie.duration} mins</p>
          <p><span className="text-white font-semibold">Genre:</span> {movie.genre}</p>
          <p><span className="text-white font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>

        {/* Book Show Button */}
        <button
          onClick={handleBookShow}
          className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-3 rounded-md transition"
        >
          Book Show
        </button>
      </div>
    </div>
    </>
  );
};

export default MovieDetails;




// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MovieDetails = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
  
//     axios
//       .get(`http://localhost:5001/api/movies/${movieId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setMovie(res.data);
//         setError('');
//       })
//       .catch((err) => {
//         setError('Unauthorized or movie not found');
//         console.error(err);
//       });
//   }, [movieId]);

//   const handleBookShow = () => {
//     navigate(`/movie/${movieId}/theatres`);
//   };

//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!movie) return <div className="p-6 text-white">Loading...</div>;

//   return (
//     <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen p-8 flex items-center justify-center">
//       <div className="max-w-4xl w-full bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl shadow-red-900 overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           {movie.poster && (
//             <img
//               src={`/${movie.poster}`}
//               alt={movie.title}
//               className="md:w-1/3 w-full h-auto object-cover rounded-l-3xl md:rounded-r-none"
//             />
//           )}
//           <div className="md:w-2/3 p-8 text-white flex flex-col justify-between">
//             <div>
//               <h1 className="text-5xl font-extrabold text-red-600 drop-shadow-lg mb-6">{movie.title}</h1>
//               <p className="text-lg text-gray-300 leading-relaxed mb-6">{movie.description}</p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-400 mb-8">
//                 <p><span className="text-white font-semibold">Language:</span> {movie.language}</p>
//                 <p><span className="text-white font-semibold">Duration:</span> {movie.duration} mins</p>
//                 <p><span className="text-white font-semibold">Genre:</span> {movie.genre}</p>
//                 <p><span className="text-white font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
//               </div>
//             </div>

//             {/* Book Show Button */}
//             <button
//               onClick={handleBookShow}
//               className="self-start bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-red-700/50 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500"
//             >
//               Book Show
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
