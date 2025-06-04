import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoviesPage from './pages/MoviesPage';
import Manager from './pages/Manager';
import Theater from './pages/Theater';
import UsersList from './pages/UsersList';
import Shows from "./pages/Shows";
import MoviesList from "./pages/MoviesList";
import Navbar from "./pages/Navbar";
import MovieShows from './pages/MovieShows';
import MovieTheatres from './pages/MovieTheatres';
import MovieShowtimes from './pages/MovieShowtimes';
import BookingPage from './pages/BookingPage';
import MovieDetails from './pages/MovieDetails';
import BookingHistory from './pages/BookingHistory';
import AllBookings from './pages/AllBookings' 
import ManagerVerify from './pages/ManagerVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/moviespage" element={<MoviesPage/>} />
        <Route path="/manager" element={<Manager/>} />
        <Route path="/theater" element={<Theater/>} />
        <Route path="/users" element={<UsersList/>} />
        <Route path="/shows" element={<Shows/>} />
        <Route path="/movieslist" element={<MoviesList/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/movie/:movieId/shows" element={<MovieShows />} />
        <Route path="/movie/:movieId/theatres" element={<MovieTheatres />} />
        <Route path="/shows/:movieId/:theatreId" element={<MovieShowtimes />} />
        <Route path="/booking/:showId" element={<BookingPage />} />
        {/* <Route path="/movie/:movieId" element={<MovieShows />} /> */}
        {/* <Route path="/movie/:movieid" element={<MovieDetails/>}/> */}
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/booking/history" element={<BookingHistory />} />
        {/* <Route path="/shows/:bookingshowid/edit" element={<EditBooking />} /> */}
        <Route path="/allbookings" element={<AllBookings />} />
        <Route path="/manager/verify" element={<ManagerVerify />} />

      </Routes>
    </Router>
  );
}

export default App;
