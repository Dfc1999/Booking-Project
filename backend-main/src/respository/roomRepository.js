import Room from '../models/room.js';

export const createRoom = async (roomData) => {
  const room = new Room(roomData);
  return await room.save();
};

export const getRoomById = async (id) => {
  return await Room.findById(id);
};

export const updateRoom = async (id, updateData) => {
  return await Room.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};