import * as hotelService from '../services/hotelService.js';
import multer from 'multer';

export const upload = multer({ storage: multer.memoryStorage() });

export const createHotelController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Se requiere al menos una imagen' });
    }

    const hotel = await hotelService.createHotelService(
      req.body, 
      req.files 
    );

    res.status(201).json(hotel);

  } catch (error) {
    res.status(400).json({ 
      message: error.message || 'Error al crear el hotel' 
    });
  }
};

export const getHotelsController = async (req, res) => {
  try {
    const hotels = await hotelService.getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHotelController = async (req, res) => {
  try {
    const hotel = await hotelService.getHotel(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHotelController = async (req, res) => {
  try {
    const hotel = await hotelService.updateHotelService(req.params.id, req.body);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHotelController = async (req, res) => {
  try {
    const hotel = await hotelService.deleteHotelService(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHotelRoomsController = async (req, res) => {
  try {
    const rooms = await hotelService.getHotelRooms(req.params.id);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRoomToHotelController = async (req, res) => {
  try {
    const { id } = req.params;
    const roomData = req.body;

    const room = await hotelService.addRoomToHotel(id, roomData);

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchHotelsController = async (req, res) => {
  try {
    const results = await hotelService.searchHotelsService(req.query);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No hotels found matching your criteria.' });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHotelAvailabilityController = async (req, res) => {
  try {
    const { hotelId } = req.params;
    // Recogemos 'persons' de la query, además de las fechas
    const { checkIn, checkOut } = req.query; 
    
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    const summary = await hotelService.getAvailabilitySummary(
      hotelId, 
      new Date(checkIn), 
      new Date(checkOut),
    );
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailedRoomsController = async (req, res) => {
  try {
    const { hotelId, roomType } = req.params;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    const rooms = await hotelService.getDetailedAvailableRooms(
      hotelId,
      roomType,
      new Date(checkIn),
      new Date(checkOut),
    );

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};