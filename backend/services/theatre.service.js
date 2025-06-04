import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTheatres = async () => {
  return prisma.theatre.findMany();
};

export const getTheatreById = async (id) => {
  return prisma.theatre.findUnique({ where: { id } });
};

export const createTheatre = async (data) => {
  return prisma.theatre.create({ data });
};

export const updateTheatre = async (id, data) => {
  return prisma.theatre.update({
    where: { id },
    data,
  });
};

export const deleteTheatre = async (id) => {
  return prisma.theatre.delete({ where: { id } });
};

