// ========================================
// GET WEATHER
// ========================================

export const getWeather = async (req, res) => {

    try {

        const { state, city } = req.query;


        // STATE + CITY CHECK

        if (!state || !city) {

            return res.status(400).json({
                message: "State aur City required hai"
            });

        }


        // ========================================
        // CITY → LATITUDE / LONGITUDE
        // ========================================

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                city
            )}&count=1&language=en&format=json&countryCode=IN`
        );


        if (!locationResponse.ok) {

            throw new Error(
                "Location API error"
            );

        }


        const locationData =
            await locationResponse.json();


        // CITY NOT FOUND

        if (
            !locationData.results ||
            locationData.results.length === 0
        ) {

            return res.status(404).json({
                message: "City nahi mili"
            });

        }


        // LOCATION DATA

        const location =
            locationData.results[0];


        const latitude =
            location.latitude;

        const longitude =
            location.longitude;



        // ========================================
        // WEATHER API
        // ========================================

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`
        );


        if (!weatherResponse.ok) {

            throw new Error(
                "Weather API error"
            );

        }


        const weatherData =
            await weatherResponse.json();



        // ========================================
        // AIR QUALITY API
        // ========================================

        const airResponse = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto`
        );


        if (!airResponse.ok) {

            throw new Error(
                "Air Quality API error"
            );

        }


        const airData =
            await airResponse.json();



        // ========================================
        // FINAL WEATHER RESPONSE
        // ========================================

        res.status(200).json({

            state: state,

            city: city,

            temperature:
                weatherData.current.temperature_2m,

            humidity:
                weatherData.current.relative_humidity_2m,

            windSpeed:
                weatherData.current.wind_speed_10m,

            weatherCode:
                weatherData.current.weather_code,

            isDay:
                weatherData.current.is_day,

            airQuality:
                airData.current.us_aqi

        });


    } catch (error) {

        console.error(
            "Weather Error:",
            error
        );


        res.status(500).json({

            message:
                "Weather data fetch nahi hua",

            error:
                error.message

        });

    }

};





// ========================================
// GET FORECAST
// ========================================

export const getForecast = async (req, res) => {

    try {

        const { state, city } = req.query;


        // ========================================
        // STATE + CITY CHECK
        // ========================================

        if (!state || !city) {

            return res.status(400).json({
                message: "State aur City required hai"
            });

        }



        // ========================================
        // CITY → LATITUDE / LONGITUDE
        // ========================================

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                city
            )}&count=1&language=en&format=json&countryCode=IN`
        );


        if (!locationResponse.ok) {

            throw new Error(
                "Location API error"
            );

        }


        const locationData =
            await locationResponse.json();


        // CITY NOT FOUND

        if (
            !locationData.results ||
            locationData.results.length === 0
        ) {

            return res.status(404).json({
                message: "City nahi mili"
            });

        }


        // LOCATION DATA

        const location =
            locationData.results[0];


        const latitude =
            location.latitude;

        const longitude =
            location.longitude;



        // ========================================
        // DAILY + HOURLY FORECAST API
        // ========================================

        const forecastResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
        );


        if (!forecastResponse.ok) {

            throw new Error(
                "Forecast API error"
            );

        }


        const forecastData =
            await forecastResponse.json();



        // ========================================
        // FINAL FORECAST RESPONSE
        // ========================================

        res.status(200).json({

            state: state,

            city: city,


            // 7 DAYS DATA

            daily:
                forecastData.daily,


            // HOURLY DATA

            hourly:
                forecastData.hourly

        });


    } catch (error) {

        console.error(
            "Forecast Error:",
            error
        );


        res.status(500).json({

            message:
                "Forecast data fetch nahi hua",

            error:
                error.message

        });

    }

};