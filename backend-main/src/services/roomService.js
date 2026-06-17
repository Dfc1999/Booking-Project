import * as roomRepository from '../respository/roomRepository.js';

export const createRoomService = async (roomData) => {
  return await roomRepository.createRoom(roomData);
};

export const getRoom = async (id) => {
  return await roomRepository.getRoomById(id);
};

export const updateRoomService = async (id, updateData) => {
  return await roomRepository.updateRoom(id, updateData);
};

export const deleteRoomSrvice = async (id) => {
  return await roomRepository.deleteRoom(id);
};