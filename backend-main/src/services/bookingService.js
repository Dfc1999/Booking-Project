import * as bookingRepository from '../respository/bookingRepository.js';
import * as roomRepository from '../respository/roomRepository.js';
import Booking from '../models/booking.js';

export const createBookingService = async (bookingData) => {
  if (!bookingData.roomIds || bookingData.roomIds.length === 0) {
    throw new Error('You must select at least one room');
  }
  if (!bookingData.guests || bookingData.guests <= 0) {
      throw new Error('Number of guests must be at least 1.');
  }

  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  if (checkIn < today) throw new Error('Check-in date cannot be in the past');
  if (checkOut <= checkIn) throw new Error('Check-out date must be after check-in date');

  const conflictingBookings = await Booking.find({
    rooms: { $in: bookingData.roomIds }, 
    status: 'confirmed',
    $or: [
      { checkInDate: { $lt: checkOut, $gte: checkIn } },
      { checkOutDate: { $gt: checkIn, $lte: checkOut } },
      { checkInDate: { $lte: checkIn }, checkOutDate: { $gte: checkOut } }
    ]
  }).lean(); 

  if (conflictingBookings.length > 0) {
    const bookedRoomIds = conflictingBookings.flatMap(b => b.rooms.map(id => id.toString()));
    const unavailableRooms = bookingData.roomIds.filter(id => bookedRoomIds.includes(id));
    throw new Error(`The following rooms are not available for the selected dates: ${unavailableRooms.join(', ')}`);
  }

  const roomsDetails = await Promise.all(
    bookingData.roomIds.map(id => roomRepository.getRoomById(id))
  );

  if (roomsDetails.some(r => !r)) throw new Error('One or more rooms were not found.');
  
  let totalPrice = 0;
  let totalCapacity = 0;
  
  const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  
  for (const room of roomsDetails) {
    totalPrice += days * room.price;
    totalCapacity += room.capacity;
  }
  
  if (bookingData.guests > totalCapacity) {
    throw new Error(`The number of guests (${bookingData.guests}) exceeds the total capacity of the selected rooms (${totalCapacity}).`);
  }

  const hotelId = roomsDetails[0].hotelId; 
  const newBookingData = {
    ...bookingData,
    hotelId,
    rooms: bookingData.roomIds, 
    totalPrice,
  };

  const booking = await bookingRepository.createBooking(newBookingData);
  return booking;
};

export const getBooking = async (id) => {
  return await bookingRepository.getBookingById(id);
};

export const getBookingsByUser = async (guestId = null) => {
  if (guestId) {
    return await bookingRepository.getBookingsByGuest(guestId);
  }
  return await bookingRepository.getAllBookings();
};

export const updateBookingService = async (id, updateData) => {
  return await bookingRepository.updateBooking(id, updateData);
};

export const cancelBookingService = async (id) => {
  const booking = await bookingRepository.getBookingById(id);
  if (!booking) throw new Error('Booking not found');

  const now = new Date();
  const checkInDate = new Date(booking.checkInDate);
  const daysBefore = (checkInDate - now) / (1000 * 60 * 60 * 24);

  if (daysBefore < 3) {
    throw new Error('Cancellation not allowed less than 3 days before check-in');
  }

  const cancelledBooking = await bookingRepository.cancelBooking(id);

  return cancelledBooking;
};

