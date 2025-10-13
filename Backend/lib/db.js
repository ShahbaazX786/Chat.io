import mongoose from "mongoose";

export const connectDB = async () => {
    const URI = process.env.DB_URI;

    if (!URI) {
        console.error('Unfortunately the DB URI was not defined.');
        process.exit(1);
    }

    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Already connected to The DB.");
            return;
        }

        await mongoose.connect(`${URI}/QuickChat`)
        console.log("Successfully connected to The DB.");
    } catch (error) {
        console.log('Error Occured During DB Connection:', error);
        retryConnection(URI);
    }

    mongoose.connection.on("disconnected", () => {
        console.warn("DB disconnected. Attempting to reconnect...");
        retryConnection(URI);
    });

    mongoose.connection.on("error", (err) => {
        console.error("DB error:", err);
    });
}

const retryConnection = async (URI, retries = 5) => {
    for (let i = 1; i <= retries; i++) {
        try {
            await new Promise((res) => setTimeout(res, 5000));
            await mongoose.connect(`${URI}/QuickChat`);
            console.log('Reconnection to the DB Sucessful!');
            return;
        } catch (error) {
            console.error(`Retry ${i}/${retries} failed:`, error.message);
        }
    }
    console.error("All reconnection attempts failed. Shutting down...");
    process.exit(1);
}