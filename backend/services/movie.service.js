import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createMovie = async (data) => {
  return await prisma.movie.create({ data });
};

export const getAllMovies = async () => {
  return await prisma.movie.findMany();
};


export const getMovieById = async (id) => {
  return await prisma.movie.findUnique({
    where: { id: id },
  });
};


export const updateMovie = async (id, data) => {
  return await prisma.movie.update({
    where: { id: Number(id) },
    data: {
      ...data,
      duration: Number(data.duration),
      releaseDate: new Date(data.releaseDate),
    },
  });
};


export const deleteMovie = async (id) => {
  return await prisma.movie.delete({ where: { id: Number(id) } });
};
