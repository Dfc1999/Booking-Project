import express from 'express';
import * as roomController from '../controllers/roomController.js';
import { authMiddleware } from '../middlewares/authMiddleware/keycloakMiddleware.js';
import { hasRealmRoles } from '../middlewares/authMiddleware/hasRealmRoles.js';

const router = express.Router();

router.get('/:id', roomController.getRoomController);
router.put('/:id', authMiddleware, hasRealmRoles(['admin']), roomController.updateRoomController);
router.delete('/:id', authMiddleware, hasRealmRoles(['admin']), roomController.deleteRoomController);

export default router;