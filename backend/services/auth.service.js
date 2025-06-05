import prisma from '../utils/prismaClient.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists with this email');

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });
  console.log("User found:", user);


  const token = generateToken(user.id);
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};


export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  console.log("User found:", isMatch);

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
