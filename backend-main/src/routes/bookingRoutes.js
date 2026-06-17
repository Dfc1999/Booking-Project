import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware/keycloakMiddleware.js';
import { hasRealmRoles } from '../middlewares/authMiddleware/hasRealmRoles.js';

const router = express.Router();

router.post('/', authMiddleware, hasRealmRoles(['default-roles-production']), bookingController.createBookingController);
router.get('/', authMiddleware, hasRealmRoles(['default-roles-production']), bookingController.getBookingsByUserController);
router.get('/:id', authMiddleware, hasRealmRoles(['default-roles-production']), bookingController.getBookingController);
router.put('/:id', authMiddleware, hasRealmRoles(['default-roles-production']), bookingController.updateBookingController);
router.delete('/:id', authMiddleware, hasRealmRoles(['default-roles-production']), bookingController.cancelBookingController);

export default router;