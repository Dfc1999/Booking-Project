import express from 'express';
import { authLogin, logoutUserController, getUserSessionsController, refreshTokenController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware/keycloakMiddleware.js';

const router = express.Router();

router.post('/login', authLogin);
router.post('/logout', authMiddleware, logoutUserController);
router.get('/sessions', authMiddleware, getUserSessionsController);
router.post('/refresh-token', authMiddleware, refreshTokenController);

export default router;
