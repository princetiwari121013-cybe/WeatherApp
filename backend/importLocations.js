import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "./Location/Location.js";
import indiaData from "./IndiaData/IndiaData.js";

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Location.deleteMany({});

        console.log("Old location data deleted");

        const locations = Object.entries(indiaData).map(
            ([state, cities]) => ({
                state,
                cities
            })
        );

        await Location.insertMany(locations);

        console.log("All states and cities inserted successfully");

        console.log(`Total states: ${locations.length}`);

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    } catch (error) {
        console.log("Import error:", error);

        await mongoose.connection.close();
    }
};

importData();