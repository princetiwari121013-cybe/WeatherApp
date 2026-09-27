import express from "express";
import Location from "../Location/Location.js";

import {
    getWeather,
    getForecast
} from "../controllers/controllers.js";

const router = express.Router();


// Current Weather
router.get("/", getWeather);


// 7 Days Forecast
router.get("/forecast", getForecast);


// Get States + Cities
router.get("/locations", async (req, res) => {

    try {

        const locations = await Location.find();

        res.status(200).json(locations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Add State + Cities
router.post("/locations", async (req, res) => {

    try {

        const { state, cities } = req.body;

        const location = await Location.create({
            state,
            cities
        });

        res.status(201).json(location);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;