import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  guestId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }],
  
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled'], 
    default: 'confirmed' 
  },
  createdAt: { type: Date, default: Date.now },
  cancelledAt: { type: Date }
});

export default mongoose.model('Booking', bookingSchema);