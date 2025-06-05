import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createShow = async (showData) => {
  return prisma.show.create({
    data: {
      movieId: showData.movieId,
      theatreId: showData.theatreId,
      date: new Date(showData.date),
      time: showData.time,
      totalSeats: showData.totalSeats,
      availableSeats: showData.availableSeats,
      pricePerSeat: showData.pricePerSeat,
    },
    include: {
      movie: true,
      theatre: true,
    },
  });
};

export const getAllShows = async () => {
  return prisma.show.findMany({
    include: {
      movie: true,
      theatre: true,
    },
  });
};

export const getShowById = async (id) => {
  return prisma.show.findUnique({
    where: { id: Number(id) },
    include: {
      movie: true,
      theatre: true,
    },
  });
};

export const updateShow = async (id, showData) => {
  return prisma.show.update({
    where: { id: Number(id) },
    data: {
      movieId: showData.movieId,
      theatreId: showData.theatreId,
      date: new Date(showData.date),
      time: showData.time,
      totalSeats: showData.totalSeats,
      availableSeats: showData.availableSeats,
      pricePerSeat: showData.pricePerSeat,
    },
    include: {
      movie: true,
      theatre: true,
    },
  });
};

export const deleteShow = async (id) => {
  return prisma.show.delete({
    where: { id: Number(id) },
  });
};



export const getShowsByMovieId = async (movieId) => {
  return await prisma.show.findMany({
    where: { movieId: Number(movieId) },
    include: {
      movie: true,
      theatre: true,
    },
  });
};
  
export const getTheatresByMovieId = async (movieId) => {
  const shows = await prisma.show.findMany({
    where: {
      movieId: parseInt(movieId),
    },
    include: {
      theatre: true,
    },
  });

  const uniqueTheatresMap = new Map();
  shows.forEach((show) => {
    uniqueTheatresMap.set(show.theatre.id, show.theatre);
  });

  return Array.from(uniqueTheatresMap.values());
};


export const getFilteredShows = async (movieId, theatreId, selectedDate) => {
  const dateStart = new Date(selectedDate);
  dateStart.setHours(0, 0, 0, 0);

  const dateEnd = new Date(selectedDate);
  dateEnd.setHours(23, 59, 59, 999);

  const shows = await prisma.show.findMany({
    where: {
      movieId: parseInt(movieId),
      theatreId: parseInt(theatreId),
      date: {
        gte: dateStart,
        lte: dateEnd,
      },
    },
    include: {
      movie: true,
      theatre: true,
    },
    orderBy: {
      time: 'asc',
    },
  });

  return shows;
};


// import prisma from '../prismaClient.js';

export const getShowsForManager = async (managerEmail) => {
  const manager = await prisma.manager.findFirst({
    where: { email: managerEmail }
  });

  if (!manager) {
    throw new Error('Manager not found.');
  }

  const theater = await prisma.theatre.findFirst({
    where: {
      name: manager.theatreName
    },
    include: {
      shows: {
        include: {
          movie: true
        }
      }
    }
  });

  if (!theater) {
    throw new Error('Theater not found for the manager.');
  }

  return theater.shows;
};
