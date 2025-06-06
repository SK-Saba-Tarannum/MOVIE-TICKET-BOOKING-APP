// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Users, Theater, Shield,Film,Trash2,Edit2, BookOpen } from 'lucide-react'; 
// import Navbar from './Navbar';

// // const API_URL = 'https://movie-ticket-booking-app-2.onrender.com/api/movies/';

// const MovieCard = ({ movie, onEdit, onDelete }) => (
//   <div className="bg-gray-800 p-5 rounded-2xl shadow-xl  text-white relative">
//     <img
//       src={movie.poster}
//       alt={movie.title}
//       className="w-full h-52 object-cover rounded-xl mb-3"
//     />
//     <h3 className="text-xl font-bold text-teal-400">{movie.title}</h3>
//     <p className="text-gray-300 italic">{movie.genre} | {movie.language}</p>
//     <p className="text-white/90 mt-2 sm:line-clamp-1">{movie.description}</p>
//     <div className="text-sm text-gray-300 mt-2 sm:mb-6">
//       Duration: {movie.duration} min<br />
//       Released Date: {new Date(movie.releaseDate).toLocaleDateString()}
//     </div>
//     <div className="absolute bottom-3 flex right-3 space-x-2">
//       <button
//         onClick={() => onEdit(movie)}
//         className="bg-teal-400 flex text-black  gap-1  hover:bg-teal-600 px-3 py-1 rounded-md text-sm"
//       >
//         <Edit2 size={18}/>
//         Edit
//       </button>
//       <button
//         onClick={() => onDelete(movie.id)}
//         className="bg-red-400 flex gap-1 text-black hover:bg-teal-700 px-3 py-1 rounded-md text-sm"
//       >
//         <Trash2 size={18}/>
//         Delete
//       </button>
//     </div>
//   </div>
// );

// const MovieForm = ({ onClose, onSubmit, movie }) => {
//   const [form, setForm] = useState({
//     title: movie?.title || '',
//     description: movie?.description || '',
//     duration: movie?.duration || '',
//     genre: movie?.genre || '',
//     language: movie?.language || '',
//     releaseDate: movie?.releaseDate?.split('T')[0] || '',
//     poster: movie?.poster || '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form, movie?.id);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//       <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-xl text-white">
//         <h2 className="text-2xl font-bold mb-4 text-teal-400">
//           {movie ? 'Edit Movie' : 'Add Movie'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {['title', 'description', 'genre', 'language', 'poster'].map((field) => (
//             <input
//               key={field}
//               name={field}
//               type="text"
//               value={form[field]}
//               onChange={handleChange}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//               required
//             />
//           ))}
//           <input
//             name="duration"
//             type="number"
//             value={form.duration}
//             onChange={handleChange}
//             placeholder="Duration (minutes)"
//             className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//             required
//           />
//           <input
//             name="releaseDate"
//             type="date"
//             value={form.releaseDate}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//             required
//           />
//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-white"
//             >
//               {movie ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const MoviesPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editMovie, setEditMovie] = useState(null);
//   const navigate = useNavigate();

//   const fetchMovies = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get("https://movie-ticket-booking-app-2.onrender.com/api/movies/", {
//         headers: { Authorization: `Bearer ${token}` },
//         // console.log(headers)
//       });
//       console.log(res.headers)
//       setMovies(res.data);
//     } catch (err) {
//       console.error('Failed to fetch movies:', err);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const handleAddClick = () => {
//     setEditMovie(null);
//     setShowForm(true);
//   };

//   // const handleFormSubmit = async (form, id) => {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     if (id) {
//   //       await axios.put(`https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`, form, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //     } else {
//   //       await axios.post("https://movie-ticket-booking-app-2.onrender.com/api/movies/", form, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //     }
//   //     fetchMovies();
//   //     setShowForm(false);
//   //     setEditMovie(null);
//   //   } catch (err) {
//   //     console.error('Error saving movie:', err.response?.data || err.message);

//   //   }
//   // };

//   // const handleFormSubmit = async (form, id) => {
//   //   try {
//   //     const token = localStorage.getItem('token');
  
//   //     // Log form data
//   //     console.log("Submitting form data:", form);
  
//   //     if (id) {
//   //       console.log(`Updating movie with ID: ${id}`);
//   //       const response = await axios.put(
//   //         `https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`,
//   //         form,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
//   //       console.log("Update response:", response.data);
//   //     } else {
//   //       console.log("Adding new movie...");
//   //       const response = await axios.post(
//   //         "https://movie-ticket-booking-app-2.onrender.com/api/movies/",
//   //         form,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
//   //       console.log("Add response:", response.data);
//   //     }
  
//   //     fetchMovies();        // Refresh movie list
//   //     setShowForm(false);   // Close form modal
//   //     setEditMovie(null);   // Reset edit state
  
//   //   } catch (err) {
//   //     console.error("❌ Error saving movie:", err.response?.data || err.message);
//   //   }
//   // };

//   // const handleFormSubmit = async (form, id) => {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     console.log("🔐 Token found:", token);
//   //     console.log("📝 Form content before submit:", form);
  
//   //     if (id) {
//   //       console.log(`✏️ Editing movie ID: ${id}`);
//   //       const response = await axios.put(
//   //         `https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`,
//   //         form,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
//   //       console.log("✅ Update response:", response.data);
//   //     } else {
//   //       console.log("➕ Adding new movie...");
//   //       const response = await axios.post(
//   //         "https://movie-ticket-booking-app-2.onrender.com/api/movies/",
//   //         form,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
//   //       console.log("✅ Add response:", response.data);
//   //     }
  
//   //     fetchMovies();
//   //     setShowForm(false);
//   //     setEditMovie(null);
  
//   //   } catch (err) {
//   //     console.error("❌ Error saving movie:", err.response?.data || err.message);
//   //   }
//   // };
  

//   // const handleFormSubmit = async (form, id) => {
//   //   const token = localStorage.getItem('token');
//   //   console.log("🔐 Token found:", token);
//   //   console.log("📝 Form content before submit:", form);
  
//   //   try {
//   //     if (id) {
//   //       console.log(`✏️ Editing movie ID: ${id}`);
//   //       const response = await axios.put(
//   //         `https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`,
//   //         form,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             'Content-Type': 'application/json',
//   //           },
//   //         }
//   //       );
//   //       console.log("✅ Update response:", response.data);
//   //     } else {
//   //       console.log("➕ Adding new movie...");
//   //       const response = await axios.post(
//   //         "https://movie-ticket-booking-app-2.onrender.com/api/movies/",
//   //         form,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             'Content-Type': 'application/json',
//   //           },
//   //         }
//   //       );
//   //       console.log("✅ Add response:", response.data);
//   //     }
  
//   //     await fetchMovies();        // Refresh list
//   //     setShowForm(false);         // Close form modal
//   //     setEditMovie(null);         // Clear edit state
  
//   //   } catch (err) {
//   //     console.error("❌ Error saving movie:", err);
//   //     console.error("🔍 Error details:", err.response?.data || err.message);
//   //   }
//   // };
  
//   const handleFormSubmit = async (form, id) => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log("🔐 Token found:", token);
//       console.log("📝 Form content before submit:", form);
  
//       // Ensure correct types
//       const preparedForm = {
//         ...form,
//         duration: Number(form.duration),
//         releaseDate: new Date(form.releaseDate),
//       };
  
//       if (id) {
//         console.log("✏️ Editing movie ID:", id);
//         const response = await axios.put(
//           `https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`,
//           preparedForm,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("✅ Update success:", response.data);
//       } else {
//         console.log("➕ Adding new movie...");
//         const response = await axios.post(
//           "https://movie-ticket-booking-app-2.onrender.com/api/movies/",
//           preparedForm,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("✅ Add success:", response.data);
//       }
  
//       await fetchMovies(); // refresh movies
//       setShowForm(false);
//       setEditMovie(null);
  
//     } catch (err) {
//       console.error("❌ Error saving movie:", err.response?.data || err.message);
//     }
//   };
  


//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this movie?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`https://movie-ticket-booking-app-2.onrender.com/api/movies/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchMovies();
//     } catch (err) {
//       console.error('Failed to delete movie:', err);
//     }
//   };

//   return (
    

//       <>
//         <Navbar />
//         <div className="flex flex-col md:flex-row bg-[#121212] text-white h-screen overflow-hidden">

//           {/* Sidebar */}
//           <aside className="w-full md:w-56  bg-gray-800 px-4 py-4 md:py-6 md:px-6 md:rounded-3xl border-b-2 md:border-b-0 md:border-r-2 border-teal-200 
//                             sticky top-0 md:sticky md:top-0  md:h-screen z-40">
//             <h2 className="text-xl md:text-2xl font-bold text-teal-400 text-center md:text-left">Dashboard</h2>

//             <div className="flex flex-col space-y-3 mt-6">
//               <button
//                 onClick={() => navigate('/moviespage')}
//                 className="flex items-center gap-2 text-left bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//               >
//                 <Film size={18} />
//                 <span className=" sm:inline">Movies</span>
//               </button>
//               <button
//                 onClick={() => navigate('/manager')}
//                 className="flex items-center gap-2 text-left bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//               >
//                 <Shield size={18} />
//                 <span className="">Managers</span>
//               </button>
//               <button
//                 onClick={() => navigate('/theater')}
//                 className="flex items-center gap-2 text-left bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//               >
//                 <Theater size={18} />
//                 <span className="">Theaters</span>
//               </button>
//               <button
//                 onClick={() => navigate('/allbookings')}
//                 className="flex items-center gap-2 text-left bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//               >
//                 <BookOpen size={18} />
//                 <span className="">Bookings</span>
//               </button>
           
//               <button
//                 onClick={() => navigate('/users')}
//                 className="flex items-center gap-2 text-left bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//               >
//                 <Users size={18} />
//                 <span className="">Users</span>
//               </button>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 h-screen">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
//               <h1 className="text-2xl sm:text-3xl font-bold text-teal-400">Movies</h1>
//               <button
//                 onClick={handleAddClick}
//                 className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow text-sm sm:text-base"
//               >
//                 + Add Movie
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {movies.map((movie) => (
//                 <MovieCard
//                   key={movie.id}
//                   movie={movie}
//                   onEdit={(m) => {
//                     setEditMovie(m);
//                     setShowForm(true);
//                   }}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>
//           </main>

//           {/* Form Modal */}
//           {showForm && (
//             <MovieForm
//               movie={editMovie}
//               onClose={() => {
//                 setShowForm(false);
//                 setEditMovie(null);
//               }}
//               onSubmit={handleFormSubmit}
//             />
//           )}
//         </div>
//       </>
      
//   );
// };

// export default MoviesPage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Users, Theater, Shield, Film, Trash2, Edit2, BookOpen } from 'lucide-react';
// import Navbar from './Navbar';

// const API_URL = 'https://movie-ticket-booking-app-2.onrender.com/api/movies/';

// const MovieCard = ({ movie, onEdit, onDelete }) => (
//   <div className="bg-gray-800 p-5 rounded-2xl shadow-xl text-white relative">
//     <img
//       src={movie.poster}
//       alt={movie.title}
//       className="w-full h-52 object-cover rounded-xl mb-3"
//     />
//     <h3 className="text-xl font-bold text-teal-400">{movie.title}</h3>
//     <p className="text-gray-300 italic">
//       {movie.genre} | {movie.language}
//     </p>
//     <p className="text-white/90 mt-2 sm:line-clamp-1">{movie.description}</p>
//     <div className="text-sm text-gray-300 mt-2 sm:mb-6">
//       Duration: {movie.duration} min<br />
//       Released Date: {new Date(movie.releaseDate).toLocaleDateString()}
//     </div>
//     <div className="absolute bottom-3 flex right-3 space-x-2">
//       <button
//         onClick={() => onEdit(movie)}
//         className="bg-teal-400 flex text-black gap-1 hover:bg-teal-600 px-3 py-1 rounded-md text-sm"
//       >
//         <Edit2 size={18} /> Edit
//       </button>
//       <button
//         onClick={() => onDelete(movie.id)}
//         className="bg-red-400 flex gap-1 text-black hover:bg-teal-700 px-3 py-1 rounded-md text-sm"
//       >
//         <Trash2 size={18} /> Delete
//       </button>
//     </div>
//   </div>
// );

// const MovieForm = ({ onClose, onSubmit, movie }) => {
//   const [form, setForm] = useState({
//     title: movie?.title || '',
//     description: movie?.description || '',
//     duration: movie?.duration || '',
//     genre: movie?.genre || '',
//     language: movie?.language || '',
//     releaseDate: movie?.releaseDate?.split('T')[0] || '',
//     poster: movie?.poster || '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form, movie?.id);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//       <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-xl text-white">
//         <h2 className="text-2xl font-bold mb-4 text-teal-400">
//           {movie ? 'Edit Movie' : 'Add Movie'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {['title', 'description', 'genre', 'language', 'poster'].map((field) => (
//             <input
//               key={field}
//               name={field}
//               type="text"
//               value={form[field]}
//               onChange={handleChange}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//               required
//             />
//           ))}
//           <input
//             name="duration"
//             type="number"
//             value={form.duration}
//             onChange={handleChange}
//             placeholder="Duration (minutes)"
//             className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//             required
//           />
//           <input
//             name="releaseDate"
//             type="date"
//             value={form.releaseDate}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:border-teal-500"
//             required
//           />
//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-white"
//             >
//               {movie ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const MoviesPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editMovie, setEditMovie] = useState(null);
//   const navigate = useNavigate();

//   const fetchMovies = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMovies(res.data);
//     } catch (err) {
//       console.error('Failed to fetch movies:', err);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const handleFormSubmit = async (form, id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const preparedForm = {
//         ...form,
//         duration: Number(form.duration),
//         releaseDate: new Date(form.releaseDate),
//       };

//       if (id) {
//         await axios.put(`${API_URL}${id}`, preparedForm, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         await axios.post(API_URL, preparedForm, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       await fetchMovies();
//       setShowForm(false);
//       setEditMovie(null);
//     } catch (err) {
//       console.error("Error saving movie:", err.response?.data || err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this movie?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${API_URL}${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchMovies();
//     } catch (err) {
//       console.error('Failed to delete movie:', err);
//     }
//   };

//   const handleAddClick = () => {
//     setEditMovie(null);
//     setShowForm(true);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col md:flex-row bg-[#121212] text-white h-screen overflow-hidden">
//         {/* Sidebar */}
//         <aside className="w-full md:w-56 bg-gray-800 px-4 py-4 md:py-6 md:px-6 md:rounded-3xl border-b-2 md:border-b-0 md:border-r-2 border-teal-200 sticky top-0 md:h-screen z-40">
//           <h2 className="text-xl md:text-2xl font-bold text-teal-400 text-center md:text-left">Dashboard</h2>
//           <div className="flex flex-col space-y-3 mt-6">
//             <SidebarButton label="Movies" icon={<Film size={18} />} path="/moviespage" />
//             <SidebarButton label="Managers" icon={<Shield size={18} />} path="/manager" />
//             <SidebarButton label="Theaters" icon={<Theater size={18} />} path="/theater" />
//             <SidebarButton label="Bookings" icon={<BookOpen size={18} />} path="/allbookings" />
//             <SidebarButton label="Users" icon={<Users size={18} />} path="/users" />
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 h-screen">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
//             <h1 className="text-2xl sm:text-3xl font-bold text-teal-400">Movies</h1>
//             <button
//               onClick={handleAddClick}
//               className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow text-sm sm:text-base"
//             >
//               + Add Movie
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {movies.map((movie) => (
//               <MovieCard
//                 key={movie.id}
//                 movie={movie}
//                 onEdit={(m) => {
//                   setEditMovie(m);
//                   setShowForm(true);
//                 }}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         </main>

//         {/* Movie Form Modal */}
//         {showForm && (
//           <MovieForm
//             movie={editMovie}
//             onClose={() => {
//               setShowForm(false);
//               setEditMovie(null);
//             }}
//             onSubmit={handleFormSubmit}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// // Sidebar Button Component
// const SidebarButton = ({ label, icon, path }) => {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate(path)}
//       className="flex items-center gap-2 bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );
// };

// export default MoviesPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, Theater, Shield, Film, BookOpen } from 'lucide-react';
import Navbar from './Navbar';
import MovieCard from './MovieCard'; // if extracted, or keep inline

const API_URL = 'https://movie-ticket-booking-app-2.onrender.com/api/movies/';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    } catch (err) {
      console.error('Failed to delete movie:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row bg-[#121212] text-white h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-56 bg-gray-800 px-4 py-4 md:py-6 md:px-6 md:rounded-3xl border-b-2 md:border-b-0 md:border-r-2 border-teal-200 sticky top-0 md:h-screen z-40">
          <h2 className="text-xl md:text-2xl font-bold text-teal-400 text-center md:text-left">Dashboard</h2>
          <div className="flex flex-col space-y-3 mt-6">
            <SidebarButton label="Movies" icon={<Film size={18} />} path="/moviespage" />
            <SidebarButton label="Managers" icon={<Shield size={18} />} path="/manager" />
            <SidebarButton label="Theaters" icon={<Theater size={18} />} path="/theater" />
            <SidebarButton label="Bookings" icon={<BookOpen size={18} />} path="/allbookings" />
            <SidebarButton label="Users" icon={<Users size={18} />} path="/users" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 h-screen">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-teal-400">Movies</h1>
            <button
              onClick={() => navigate('/moviespage/add')}
              className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow text-sm sm:text-base"
            >
              + Add Movie
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={() => navigate(`/moviespage/edit/${movie.id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

const SidebarButton = ({ label, icon, path }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="flex items-center gap-2 bg-gray-600 text-white text-sm md:text-lg border-b-2 border-teal-600 hover:bg-teal-500 hover:text-black py-2 px-3 rounded-md transition"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default MoviesPage;
