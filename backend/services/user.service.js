import prisma from '../utils/prismaClient.js';
import { hashPassword } from '../utils/hash.js';

export const createUser = async (userData) => {
  const { name, email, password } = userData;
  const hashed = await hashPassword(password);
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const deleteUserById = async (id) => {
  return prisma.user.delete({
    where: { id: Number(id) },
  });
};
