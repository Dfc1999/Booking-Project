import express from 'express';
import * as hotelController from '../controllers/hotelController.js';
import { authMiddleware } from '../middlewares/authMiddleware/keycloakMiddleware.js';
import { hasRealmRoles } from '../middlewares/authMiddleware/hasRealmRoles.js';
import { validateBody } from '../middlewares/validator.js';
import { upload } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/search/rooms', hotelController.searchHotelsController);

router.post('/', authMiddleware, hasRealmRoles(['admin']), upload.array('images', 5), validateBody(['name', 'location', 'starRating']), hotelController.createHotelController);
router.get('/', hotelController.getHotelsController);
router.get('/:id', hotelController.getHotelController);
router.put('/:id', authMiddleware, hasRealmRoles(['admin']), validateBody(['name', 'location', 'starRating']), hotelController.updateHotelController);
router.delete('/:id', authMiddleware, hasRealmRoles(['admin']), hotelController.deleteHotelController);

router.get('/:id/rooms', hotelController.getHotelRoomsController);
router.post('/:id/rooms', authMiddleware, hasRealmRoles(['admin']), hotelController.addRoomToHotelController);
router.get('/:hotelId/availability', hotelController.getHotelAvailabilityController);
router.get('/:hotelId/availability/:roomType', hotelController.getDetailedRoomsController);

export default router;