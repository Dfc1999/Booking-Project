import Booking from '../models/booking.js';

export const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

export const getBookingById = async (id) => {
  return await Booking.findById(id);
};

export const getBookingsByGuest = async (guestId) => {
  return await Booking.find({ guestId });
};

export const getAllBookings = async () => {
  return await Booking.find();
};

export const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, { new: true });
};

export const cancelBooking = async (id) => {
  return await Booking.findByIdAndUpdate(
    id, 
    { 
      status: 'cancelled', 
      cancelledAt: new Date() 
    }, 
    { new: true }
  );
};