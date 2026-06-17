import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomNumber: { type: String, required: true }, 
  type: { 
    type: String, 
    enum: ['single', 'double', 'triple', 'suite'], 
    required: true 
  },
  beds: { type: Number, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  features: { type: String }
});

roomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });

export default mongoose.model('Room', roomSchema);