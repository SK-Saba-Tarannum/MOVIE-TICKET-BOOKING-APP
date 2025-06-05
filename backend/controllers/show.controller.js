import * as showService from '../services/show.service.js';
import { getShowsByMovieId } from '../services/show.service.js';
import { getTheatresByMovieId } from '../services/show.service.js';
import { getFilteredShows } from '../services/show.service.js';
import { getShowsForManager } from '../services/show.service.js';

export const createShow = async (req, res) => {
  try {
    const newShow = await showService.createShow(req.body);
    res.status(201).json(newShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create show' });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const shows = await showService.getAllShows();
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch shows' });
  }
};

export const getShowById = async (req, res) => {
  try {
    const show = await showService.getShowById(req.params.id);
    if (!show) return res.status(404).json({ error: 'Show not found' });
    res.json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch show' });
  }
};

export const updateShow = async (req, res) => {
  try {
    const updatedShow = await showService.updateShow(req.params.id, req.body);
    res.json(updatedShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update show' });
  }
};

export const deleteShow = async (req, res) => {
  try {
    await showService.deleteShow(req.params.id);
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete show' });
  }
};



export const getShowsForMovie = async (req, res) => {
  const movieId = Number(req.params.movieId);

  try {
    const shows = await getShowsByMovieId(movieId);
    if (!shows || shows.length === 0) {
      return res.status(404).json({ message: 'No shows found for this movie' });
    }

    res.json(shows);
  } catch (err) {
    console.error('Error fetching shows:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



export const getTheatresForMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const theatres = await getTheatresByMovieId(movieId);
    res.status(200).json(theatres);
  } catch (error) {
    console.error('Error fetching theatres for movie:', error);
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
};




export const getShowsByMovieTheatreAndDate = async (req, res) => {
  const { movieId, theatreId } = req.params;
  const { date } = req.query; // date is passed as a query param

  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required' });
  }

  try {
    const shows = await getFilteredShows(movieId, theatreId, date);
    res.status(200).json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ error: 'Failed to fetch shows' });
  }
};



export const getManagerShows = async (req, res) => {
  try {
    const managerEmail = req.user.email; 
    const shows = await getShowsForManager(managerEmail);
    res.status(200).json(shows);
  } catch (error) {
    console.error('Error in getManagerShows:', error.message);

    res.status(400).json({ error: error.message });
  }
};

