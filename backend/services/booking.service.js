import prisma from '../utils/prismaClient.js';

export const createBookingWithPayment = async ({
  userId,
  showId,
  numSeats,
  seats,
  amount,
  paymentData
}) => {
  const show = await prisma.show.findUnique({ where: { id: showId } });
  if (!show) throw new Error('Show not found');

  const existingSeats = await prisma.booking.findMany({
    where: { showId },
    select: { seats: true },
  });
  const alreadyBooked = existingSeats.flatMap(b => b.seats);
  const overlap = seats.filter(seat => alreadyBooked.includes(seat));
  if (overlap.length > 0) throw new Error('Some seats already booked');


  return await prisma.$transaction(async tx => {
    const booking = await tx.booking.create({
      data: {
        userId,
        showId,
        numSeats,
        amount,
        seats,
      },
    });

    await tx.payment.create({
      data: {
        ...paymentData,
        amount,
        bookingId: booking.id,
      },
    });

    await tx.show.update({
      where: { id: showId },
      data: {
        availableSeats: show.availableSeats - numSeats,
      },
    });

    return booking;
  });
};


export const getUserBookings = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      payment: true,
      show: {
        include: {
          movie: true, 
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};


export const getShowSeatData = async (showId) => {
  const show = await prisma.show.findUnique({
    where: { id: parseInt(showId) },
    select: {
      totalSeats: true,
      pricePerSeat: true,
    },
  });

  if (!show) throw new Error('Show not found');

  const bookings = await prisma.booking.findMany({
    where: { showId: parseInt(showId) },
    select: { seats: true },
  });

  const bookedSeats = bookings.flatMap(b => b.seats);

  return {
    bookedSeats,
    totalSeats: show.totalSeats,
    pricePerSeat: show.pricePerSeat,
  };
};



export const updateUserBooking = async ({ userId, bookingId, seats, numSeats, amount }) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { show: true },
  });

  if (!booking || booking.userId !== userId) {
    throw new Error('Unauthorized or booking not found');
  }

  const existingSeats = await prisma.booking.findMany({
    where: {
      showId: booking.showId,
      NOT: { id: bookingId },
    },
    select: { seats: true },
  });
  const alreadyBooked = existingSeats.flatMap(b => b.seats);
  const overlap = seats.filter(seat => alreadyBooked.includes(seat));
  if (overlap.length > 0) throw new Error('Some seats already booked');

  return await prisma.$transaction(async tx => {
    const seatDiff = numSeats - booking.numSeats;

    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        seats,
        numSeats,
        amount,
      },
    });

    await tx.payment.update({
      where: { bookingId },
      data: { amount },
    });

    await tx.show.update({
      where: { id: booking.showId },
      data: {
        availableSeats: booking.show.availableSeats - seatDiff,
      },
    });

    return updatedBooking;
  });
};

export const deleteUserBooking = async ({ userId, bookingId }) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { show: true },
  });

  if (!booking || booking.userId !== userId) {
    throw new Error('Unauthorized or booking not found');
  }

  await prisma.$transaction(async tx => {
    await tx.payment.delete({ where: { bookingId } });
    await tx.booking.delete({ where: { id: bookingId } });
    await tx.show.update({
      where: { id: booking.showId },
      data: {
        availableSeats: booking.show.availableSeats + booking.numSeats,
      },
    });
  });
};


export const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      payment: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      show: {
        include: {
          movie: true,
          theatre: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

