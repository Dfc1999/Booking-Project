import * as bookingService from '../services/bookingService.js';

export const createBookingController = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      guestId: req.tokenInfo.sub,
    };

    const booking = await bookingService.createBookingService(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getBookingsByUserController = async (req, res) => {
  try {
    const guestId = req.tokenInfo.sub;
    if (!guestId) {
      return res.status(401).json({ message: 'Unauthorized: guestId not found' });
    }

    const bookings = await bookingService.getBookingsByUser(guestId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBookingController = async (req, res) => {
  try {
    const booking = await bookingService.getBooking(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingController = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBookingService(req.params.id, req.body);
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelBookingController = async (req, res) => {
  try {
    const cancelledBooking = await bookingService.cancelBookingService(req.params.id);
    if (!cancelledBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(cancelledBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};