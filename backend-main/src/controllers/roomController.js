import * as roomService from '../services/roomService.js';

export const getRoomController = async (req, res) => {
  try {
    const room = await roomService.getRoom(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoomController = async (req, res) => {
  try {
    const room = await roomService.updateRoomService(req.params.id, req.body);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoomController = async (req, res) => {
  try {
    const room = await roomService.deleteRoomSrvice(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};