/**
 * *Import the mongoose connect function to establish MongoDB connection
 */
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const url = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await connect(url, {
           
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

export default connectDB;