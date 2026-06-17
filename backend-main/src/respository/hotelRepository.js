import Hotel from '../models/hotel.js'
import Room from '../models/room.js'
import Booking from '../models/booking.js';

export const createHotel = async (hotelData) => {
  const hotel = new Hotel({
    ...hotelData,
    images: hotelData.images || []
  });
  return await hotel.save();
};

export const getAllHotels = async () => {
  return await Hotel.find().populate('rooms');
};

export const getHotelById = async (id) => {
  return await Hotel.findById(id).populate('rooms');
};

export const updateHotel = async (id, updateData) => {
  return await Hotel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteHotel = async (id) => {
  return await Hotel.findByIdAndDelete(id);
};

export const getRoomsByHotelId = async (hotelId) => {
  return await Room.find({ hotelId, available: { $gt: 0 } });
};

export const findUnavailableRoomIds = async (hotelId, checkIn, checkOut) => {
  const conflictingBookings = await Booking.find({
    hotelId,
    status: 'confirmed',
    $or: [
        { checkInDate: { $lt: checkOut, $gte: checkIn } },
        { checkOutDate: { $gt: checkIn, $lte: checkOut } },
        { checkInDate: { $lte: checkIn }, checkOutDate: { $gte: checkOut } }
    ]
  }).select('rooms');

  return conflictingBookings.flatMap(booking => booking.rooms);
};

export const findRoomsExcludingIds = async (hotelId, roomIdsToExclude, additionalFilters = {}) => {
  return await Room.find({
    hotelId: hotelId,
    _id: { $nin: roomIdsToExclude },
    ...additionalFilters
  });
};

export const searchAvailableHotels = async (filters) => {
  const { location, persons, minPrice, maxPrice, checkIn, checkOut } = filters;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const conflictingBookings = await Booking.find({
    status: 'confirmed',
    $or: [
      { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
      { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } },
      { checkInDate: { $lte: checkInDate }, checkOutDate: { $gte: checkOutDate } }
    ]
  }).select('rooms');
  
  const unavailableRoomIds = conflictingBookings.flatMap(b => b.rooms);

  const aggregationPipeline = [
    {
      $match: {
        _id: { $nin: unavailableRoomIds },
        price: { 
            $gte: minPrice || 0, 
            $lte: maxPrice || 99999 
        }
      }
    },
    {
      $group: {
        _id: "$hotelId",
        totalCapacity: { $sum: "$capacity" },
        availableRoomsCount: { $sum: 1 }
      }
    },
    {
      $match: {
        totalCapacity: { $gte: Number(persons) || 1 }
      }
    }
  ];

  const hotelsWithEnoughCapacity = await Room.aggregate(aggregationPipeline);
  
  const hotelIds = hotelsWithEnoughCapacity.map(hotel => hotel._id);

  const hotelQuery = {
    _id: { $in: hotelIds } 
  };
  if (location) {
    hotelQuery['$or'] = [
      { 'location.country': new RegExp(location, 'i') },
      { 'location.city': new RegExp(location, 'i') },
      { 'location.province': new RegExp(location, 'i') }
    ];
  }

  return await Hotel.find(hotelQuery);
};