import express from 'express';
import { authRegister, getMyUserInfoController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware/keycloakMiddleware.js';

const router = express.Router();

router.post('/register', authRegister);
router.get('/get-info', authMiddleware, getMyUserInfoController);


export default router;