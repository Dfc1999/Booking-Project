import * as hotelRepository from '../respository/hotelRepository.js';
import * as roomRepository from '../respository/roomRepository.js';
import Hotel from '../models/hotel.js';
import { uploadImage, deleteImage } from '../config/cloudinaryService.js';

export const createHotelService = async (hotelData, files = []) => {
  try {
    const uploadedImages = [];
    for (const file of files) {
      const result = await uploadImage(file);
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    const hotel = await hotelRepository.createHotel({
      ...hotelData,
      images: uploadedImages
    });

    return hotel;

  } catch (error) {
    if (uploadedImages?.length > 0) {
      for (const img of uploadedImages) {
        await deleteImage(img.publicId).catch(console.error);
      }
    }
    throw error; 
  }
};

export const getHotels = async () => {
  return await hotelRepository.getAllHotels();
};

export const getHotel = async (id) => {
  return await hotelRepository.getHotelById(id);
};

export const updateHotelService = async (id, updateData) => {
  return await hotelRepository.updateHotel(id, updateData);
};

export const deleteHotelService = async (id) => {
  const hotel = await hotelRepository.getHotelById(id);
  if (!hotel) return null;

  if (hotel.images?.length > 0) {
    for (const img of hotel.images) {
      await deleteImage(img.publicId).catch(console.error);
    }
  }

  return hotelRepository.deleteHotel(id);
};

export const addRoomToHotel = async (hotelId, roomData) => {
  roomData.hotelId = hotelId; 
  const room = await roomRepository.createRoom(roomData);

  await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: room._id },
  });

  return room;
};

export const getHotelRooms = async (hotelId) => {
  return await hotelRepository.getRoomsByHotelId(hotelId);
};

export const searchHotelsService = async (filters) => {
  if (!filters.checkIn || !filters.checkOut) {
    throw new Error('Check-in and check-out dates are mandatory for searching.');
  }
  return await hotelRepository.searchAvailableHotels(filters);
};

export const getAvailabilitySummary = async (hotelId, checkIn, checkOut) => { 
  const unavailableRoomIds = await hotelRepository.findUnavailableRoomIds(hotelId, checkIn, checkOut);

  const availableRooms = await hotelRepository.findRoomsExcludingIds(
    hotelId,
    unavailableRoomIds
  );

  const summary = availableRooms.reduce((acc, room) => {
    if (!acc[room.type]) {
      acc[room.type] = {
        type: room.type,
        availableCount: 0,
        price: room.price
      };
    }
    acc[room.type].availableCount++;
    if (room.price < acc[room.type].price) {
      acc[room.type].price = room.price;
    }
    return acc;
  }, {});

  return Object.values(summary);
};

export const getDetailedAvailableRooms = async (hotelId, roomType, checkIn, checkOut) => {
  const unavailableRoomIds = await hotelRepository.findUnavailableRoomIds(hotelId, checkIn, checkOut);

  const filters = { 
    type: roomType 
  };
  
  const availableRooms = await hotelRepository.findRoomsExcludingIds(
    hotelId,
    unavailableRoomIds,
    filters
  );

  return availableRooms;
};