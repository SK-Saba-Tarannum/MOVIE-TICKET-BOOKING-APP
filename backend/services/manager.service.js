import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createManagerService = async (data) => {
  return prisma.manager.create(data);
};

export const getAllManagers = async () => {
  return prisma.manager.findMany();
};

export const getManagerById = async (id) => {
  return prisma.manager.findUnique({ where: { id } });
};

export const updateManager = async (id, data) => {
  const { fullName, email, phone, theatreName } = data;
  return prisma.manager.update({
    where: { id },
    data: { fullName, email, phone, theatreName }
  });
};

export const deleteManager = async (id) => {
  return prisma.manager.delete({ where: { id } });
};



export const findManagerByEmail = async (email) => {
  return await prisma.manager.findFirst({
    where: { email },
    select: {
      fullName: true,
      email: true,
      theatreName: true,
    },
  });
};
