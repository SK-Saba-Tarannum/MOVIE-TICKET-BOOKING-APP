// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../pages/Navbar';

// const MovieTheatres = () => {
//   const { movieId } = useParams();
//   const [theatres, setTheatres] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTheatres = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axios.get(`http://localhost:5001/api/shows/theatres/${movieId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTheatres(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load theatres.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTheatres();
//   }, [movieId]);

//   if (loading) return <p className="text-white text-center mt-10">Loading theatres...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
//       <h1 className="text-3xl font-bold text-teal-400 mb-8 text-center">
//         Theatres Showing This Movie
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {theatres.map((theatre) => (
//           <div
//             key={theatre.id}
//             className="bg-gray-800 p-6 rounded-xl border border-teal-500 shadow-md"
//           >
//             <h2 className="text-xl font-semibold text-teal-300 mb-2">{theatre.name}</h2>
//             <p className="mb-1">
//               <span className="font-bold text-teal-400">Location:</span> {theatre.location}
//             </p>
//             <p className="mb-1">
//               <span className="font-bold text-teal-400">Contact:</span> {theatre.contact || 'N/A'}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default MovieTheatres;





import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../pages/Navbar';
import { MapPin, Phone } from 'lucide-react';
// import Navbar from '../pages/Navbar';
const MovieTheatres = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5001/api/shows/theatres/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTheatres(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load theatres.');
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [movieId]);

  const handleShowDetails = (theatreId) => {
    navigate(`/shows/${movieId}/${theatreId}`);
  };

  if (loading) return <p className="text-white text-center mt-10">Loading theatres...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
        <h1 className="text-3xl font-bold text-teal-400 mb-10 text-center">
          Theatres Showing This Movie
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {theatres.map((theatre) => (
            <div
              key={theatre.id}
              className="bg-gradient-to-br grid grid-cols-1 sm:grid sm:grid-cols-1  lg:flex lg:flex-row justify-between align-middle from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-xl hover:shadow-teal-500/30 transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-red-400">{theatre.name}</h2>
              <p className=" flex mb-2">
                <span><MapPin className="w-5 h-5 text-teal-400 mr-2" /></span> {theatre.location}
              </p>
              <p className=" flex mb-3">
                <span><Phone className="w-5 h-5 text-teal-400 mr-2" /></span> {theatre.contact || 'N/A'}
              </p>
              <button
                onClick={() => handleShowDetails(theatre.id)}
                className="bg-teal-400 hover:to-red-500 text-white font-semibold py-2 px-5 rounded-sm shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Check Show Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieTheatres;






// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../pages/Navbar';
// import { MapPin, Phone } from 'lucide-react';

// const MovieTheatres = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const [theatres, setTheatres] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTheatres = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axios.get(`http://localhost:5001/api/shows/theatres/${movieId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTheatres(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load theatres.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTheatres();
//   }, [movieId]);

//   const handleShowDetails = (theatreId) => {
//     navigate(`/shows/${movieId}/${theatreId}`);
//   };

//   if (loading) return <p className="text-white text-center mt-10">Loading theatres...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
//         <h1 className="text-3xl font-bold text-teal-400 mb-10 text-center">
//           Theatres Showing This Movie
//         </h1>
//         <div className="grid grid-cols-1 gap-6">
//           {theatres.map((theatre) => (
//             <div
//               key={theatre.id}
//               className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-xl hover:shadow-teal-500/30 transition-shadow grid gap-4 sm:grid-cols-1 lg:flex lg:justify-between lg:items-center"
//             >
//               <div>
//                 <h2 className="text-2xl font-semibold text-red-400 mb-2">{theatre.name}</h2>
//                 <p className="flex items-center text-gray-300 mb-2">
//                   <MapPin className="w-5 h-5 text-teal-400 mr-2" />
//                   <span>{theatre.location}</span>
//                 </p>
//                 <p className="flex items-center text-gray-300 mb-4">
//                   <Phone className="w-5 h-5 text-teal-400 mr-2" />
//                   <span>{theatre.contact || 'N/A'}</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleShowDetails(theatre.id)}
//                 className="bg-gradient-to-r from-teal-300 to-red-600 hover:from-teal-400 hover:to-red-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
//               >
//                 Check Show Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MovieTheatres;
