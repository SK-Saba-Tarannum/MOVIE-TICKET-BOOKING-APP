import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js'; 
import managerRoutes from './routes/manager.routes.js';
import theatreRoutes from './routes/theatre.routes.js'; 
import showRoutes from './routes/show.routes.js';
import bookingRoutes from  './routes/booking.routes.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

prisma.$connect()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('DB connection failed', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(process.env.DATABASE_URL,process.env.JWT_SECRET,`Server running on port ${PORT}`));


