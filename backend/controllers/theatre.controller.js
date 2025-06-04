import * as theatreService from '../services/theatre.service.js';

export const getTheatres = async (req, res) => {
  try {
    const theatres = await theatreService.getAllTheatres();
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
};

export const getTheatreById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const theatre = await theatreService.getTheatreById(id);
    if (!theatre) return res.status(404).json({ error: 'Theatre not found' });
    res.json(theatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theatre' });
  }
};

export const createTheatre = async (req, res) => {
  const { name, location, contact } = req.body;
  try {
    const newTheatre = await theatreService.createTheatre({ name, location, contact });
    res.status(201).json(newTheatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create theatre' });
  }
};

export const updateTheatre = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location, contact } = req.body;
  try {
    const updatedTheatre = await theatreService.updateTheatre(id, { name, location, contact });
    res.json(updatedTheatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update theatre' });
  }
};

export const deleteTheatre = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await theatreService.deleteTheatre(id);
    res.json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete theatre' });
  }
};
