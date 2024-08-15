import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(':) MongoDB connected');
    } catch (err) {
        console.error(":( Failed to connect to MONGODB",err.message);
        process.exit(1);
    }
};
