import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { createMovie as createMovieService } from '../services/movie.service.js';
import * as movieService from '../services/movie.service.js';

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      genre,
      language,
      releaseDate,
      poster,
    } = req.body;

    console.log('Incoming movie:', req.body);

    const movie = await createMovieService({
      title,
      description,
      duration: Number(duration),
      genre,
      language,
      releaseDate: new Date(releaseDate),
      poster,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(' Error creating movie:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
};

// export const getMovieById = async (req, res) => {
//   try {
//     const movie = await movieService.getMovieById(req.params.id);
//     if (!movie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }
//     res.json(movie);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch movie', error });
//   }
// };


export const getMovieById = async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    console.log('Fetching movie with ID:', movieId);

    if (isNaN(movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }

    const movie = await movieService.getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Failed to fetch movie', error: error.message });
  }
};


export const updateMovie = async (req, res) => {
  try {
    console.log('Updating movie ID:', req.params.id);
    console.log('Data:', req.body);

    const updated = await movieService.updateMovie(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie', error });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie', error });
  }
};
