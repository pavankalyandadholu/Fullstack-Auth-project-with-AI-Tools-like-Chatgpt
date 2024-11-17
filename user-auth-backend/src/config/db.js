import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Check the environment mode
        const isProduction = process.env.NODE_ENV === 'production';

        // Set the database URL based on the environment
        const dbURI = isProduction
            ? process.env.MONGO_PROD_URI // Use production database URI
            : process.env.MONGO_DEV_URI; // Use development database URI

        await mongoose.connect(dbURI);

        console.log(`MongoDB connected successfully in ${isProduction ? 'production' : 'development'} mode.`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export {connectDB}