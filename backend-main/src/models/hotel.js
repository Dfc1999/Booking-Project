import mongoose from 'mongoose';

/**
 * *Represents hotel details including location, rating, amenities, and related rooms
 */
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true }
  },
  starRating: { 
    type: Number, 
    required: true,
    min: 1, 
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un valor entero'
    }
  },
  description: { type: String },
  amenities: [{ type: String }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  images: [{  
    url: String,
    publicId: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hotel', hotelSchema);