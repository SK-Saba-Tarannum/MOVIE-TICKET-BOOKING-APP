// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navbar from './Navbar';

// const MovieShowtimes = () => {
//   const { movieId, theatreId } = useParams();
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]); // Today's date in YYYY-MM-DD
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchShows = async () => {
//     setLoading(true);
//     setError(null);
//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.get(
//         `http://localhost:5001/api/shows/${movieId}/${theatreId}?date=${date}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setShows(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load showtimes.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, [movieId, theatreId, date]);

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
//       <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
//         Showtimes
//       </h1>

//       <div className="mb-6 text-center">
//         <label htmlFor="date" className="mr-2 font-semibold text-teal-300">Select Date:</label>
//         <input
//           id="date"
//           type="date"
//           className="bg-gray-800 text-white px-3 py-2 rounded border border-teal-500"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading shows...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : shows.length === 0 ? (
//         <p className="text-center text-gray-400">No shows available for this date.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid sm:grid-cols-1  lg:flex lg:flex-row justify-between align-middle gap-6">
//           {shows.map((show) => (
//             <div
//               key={show.id}
//               className="bg-gray-800 p-6 rounded-xl border border-teal-500 shadow-md"
//             >
//               <h2 className="text-xl font-semibold text-teal-300 mb-2">{show.movie.title}</h2>
//               <p>
//                 <span className="font-bold text-teal-400">Time:</span> {show.time}
//               </p>
//               <p>
//                 <span className="font-bold text-teal-400">Date:</span>{' '}
//                 {new Date(show.date).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="font-bold text-teal-400">Available Seats:</span>{' '}
//                 {show.availableSeats}/{show.totalSeats}
//               </p>
//               <p>
//                 <span className="font-bold text-teal-400">Price:</span> ₹{show.pricePerSeat}
//               </p>
//               <p className="mt-2 text-sm text-gray-300">
//                 <span className="font-semibold">Theatre:</span> {show.theatre.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default MovieShowtimes;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navbar from './Navbar';

// const MovieShowtimes = () => {
//   const { movieId, theatreId } = useParams();
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchShows = async () => {
//     setLoading(true);
//     setError(null);
//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.get(
//         `http://localhost:5001/api/shows/${movieId}/${theatreId}?date=${date}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setShows(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load showtimes.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, [movieId, theatreId, date]);

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#0e0e0e] text-white px-4 md:px-10 py-12">
//         <h1 className="text-4xl font-extrabold text-teal-400 text-center mb-10 tracking-tight">
//           Showtimes
//         </h1>

//         <div className="mb-10 flex justify-center items-center gap-4">
//           <label htmlFor="date" className="font-semibold text-lg text-teal-300">
//             Select Date:
//           </label>
//           <input
//             id="date"
//             type="date"
//             className="bg-gray-900 text-white px-4 py-2 rounded-md border border-teal-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-400 text-lg">Loading shows...</p>
//         ) : error ? (
//           <p className="text-center text-red-500 text-lg">{error}</p>
//         ) : shows.length === 0 ? (
//           <p className="text-center text-gray-400 text-lg">
//             No shows available for this date.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {shows.map((show) => (
//               <div
//                 key={show.id}
//                 className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-lg hover:shadow-teal-500/40 transition-shadow duration-200"
//               >
//                 <h2 className="text-2xl font-bold text-teal-300 mb-3">{show.movie.title}</h2>
//                 <div className="text-gray-300 space-y-1">
//                   <p>
//                     <span className="font-bold text-teal-400">Time:</span> {show.time}
//                   </p>
//                   <p>
//                     <span className="font-bold text-teal-400">Date:</span>{' '}
//                     {new Date(show.date).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <span className="font-bold text-teal-400">Available Seats:</span>{' '}
//                     {show.availableSeats}/{show.totalSeats}
//                   </p>
//                   <p>
//                     <span className="font-bold text-teal-400">Price:</span> ₹{show.pricePerSeat}
//                   </p>
//                   <p>
//                     <span className="font-semibold text-teal-300">Theatre:</span>{' '}
//                     {show.theatre.name}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MovieShowtimes;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {
  FaClock,
  FaCalendarAlt,
  FaChair,
  FaRupeeSign,
  FaTheaterMasks,
} from 'react-icons/fa';

const MovieShowtimes = () => {
  const { movieId, theatreId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShows = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `http://localhost:5001/api/shows/${movieId}/${theatreId}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShows(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load showtimes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [movieId, theatreId, date]);

  const handleBook = (showId) => {
    navigate(`/booking/${showId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0e0e0e]  text-white px-4 md:px-10 py-12">
        
        <div className="mb-10 bg-gray-900  rounded-2xl p-4 border-teal-400 border-2  flex justify-between items-center gap-4">
          {/* <label htmlFor="date" className="font-semibold text-lg text-teal-300">
            Select Date:
          </label> */}
          <h1 className="text-2xl font-sans font-semibold text-teal-500 text-center  tracking-tight">
          Show Times
            </h1>

          <input
            id="date"
            type="date"
            className="bg-gray-600 text-white px-4 py-2 rounded-md border border-teal-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading shows...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : shows.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No shows available for this date.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shows.map((show) => (
  <div
    key={show.id}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-lg hover:scale-105 transition-transform duration-200"
  >
    <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
      {show.movie.title}
    </h2>

    {/* Horizontal Show Info */}
    <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-300 mb-4">
      <div className="flex items-center gap-1">
        <FaClock className="text-teal-400" />
        {/* <span className="font-bold text-teal-400">Time:</span> */}
         {show.time}
      </div>

      <div className="flex items-center gap-1">
        <FaCalendarAlt className="text-teal-400" />
        {/* <span className="font-bold text-teal-400">Date:</span>{' '} */}
        {new Date(show.date).toLocaleDateString()}
      </div>

      <div className="flex items-center gap-1">
        <FaChair className="text-teal-400" />
        {/* <span className="font-bold text-teal-400">Seats:</span>{' '} */}
        {show.availableSeats}/{show.totalSeats}
      </div>

      <div className="flex items-center gap-1">
        <FaRupeeSign className="text-teal-400" />
        {/* <span className="font-bold text-teal-400">Price:</span> */}
         ₹{show.pricePerSeat}
      </div>

      <div className="flex items-center gap-1">
        <FaTheaterMasks className="text-teal-400" />
        {/* <span className="font-semibold text-teal-300">Theatre:</span> */}
         {show.theatre.name}
      </div>
    </div>

    {/* Book Button */}
    <button
      onClick={() => handleBook(show.id)}
      className="w-full bg-teal-500  text-white   font-bold py-2 rounded-md hover:bg-teal-400 transition-colors duration-200"
    >
      Book Now
    </button>
  </div>
))}




            {/* {shows.map((show) => (
              <div
                key={show.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-teal-500 shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <h2 className="text-2xl font-bold text-teal-300 mb-4">
                  {show.movie.title}
                </h2>
                <div className="text-gray-300 space-y-2 text-sm">
                  <p>
                    <FaClock className="inline mr-2 text-teal-400" />
                    <span className="font-bold text-teal-400">Time:</span> {show.time}
                  </p>
                  <p>
                    <FaCalendarAlt className="inline mr-2 text-teal-400" />
                    <span className="font-bold text-teal-400">Date:</span>{' '}
                    {new Date(show.date).toLocaleDateString()}
                  </p>
                  <p>
                    <FaChair className="inline mr-2 text-teal-400" />
                    <span className="font-bold text-teal-400">Seats:</span>{' '}
                    {show.availableSeats}/{show.totalSeats}
                  </p>
                  <p>
                    <FaRupeeSign className="inline mr-2 text-teal-400" />
                    <span className="font-bold text-teal-400">Price:</span> ₹{show.pricePerSeat}
                  </p>
                  <p>
                    <FaTheaterMasks className="inline mr-2 text-teal-400" />
                    <span className="font-semibold text-teal-300">Theatre:</span>{' '}
                    {show.theatre.name}
                  </p>
                </div>

                <button
                  onClick={() => handleBook(show.id)}
                  className="mt-6 w-full bg-teal-500 text-black font-bold py-2 rounded-md hover:bg-teal-400 transition-colors duration-200"
                >
                  🎟️ Book Now
                </button>
              </div>
            ))} */}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieShowtimes;
