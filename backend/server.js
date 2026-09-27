import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import WeatherRoutes from "./controllersRoutes/controllersRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.use("/api/Weather", WeatherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});