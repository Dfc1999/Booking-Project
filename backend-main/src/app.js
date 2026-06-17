import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import hotelRoutes from './routes/hotelRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { errorHandler } from './middlewares/errorHandler.js';   
import { logger } from './middlewares/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerSpec = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger-doc/api-docs.json')));

dotenv.config({ path: '../.env' });

console.log('MONGO_URI:', process.env.MONGO_URI);


const app = express();

console.log('Client ID:', process.env.KEYCLOAK_CLIENT_ID);
console.log('Client Secret:', process.env.KEYCLOAK_CLIENT_SECRET);

/**
 * Initialize connect to database
 */
connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger);

/**
 * *Allow requests from any origin
 */
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
/**
 * *Middleware for handling JSON data
 */
app.use(cookieParser());
app.use(express.json());

app.use('/hotels', hotelRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

/**
 * * For demostration of error handler
 */
app.get('/error-example', (req, res) => {
  throw new Error('Este es un error de prueba');
});

app.use(errorHandler);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server is running in port 3000')
});
