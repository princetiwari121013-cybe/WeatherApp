import { useQuery } from '@tanstack/react-query';

import Sunny from "./IMG/1.png";
import Moon from "./IMG/2.png";
import Rain from "./IMG/3.jpg";
import Cloudy from "./IMG/4.png";
import Snow from "./IMG/5.png";


function Image({ selectedState, selectedCity }) {

    const {
        data: weather,
        isLoading,
        isError
    } = useQuery({

        queryKey: [
            "weather",
            selectedState,
            selectedCity
        ],

        queryFn: async () => {

            const response = await fetch(
                `http://10.118.169.102:5000/api/Weather?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
            );

            if (!response.ok) {
                throw new Error("Weather data nahi mila");
            }

            return response.json();
        },

        enabled: !!selectedState && !!selectedCity,

        refetchInterval: 4000
    });


    // =========================
    // LOADING
    // =========================

    if (isLoading) {

        return (
            <div
                id="Image"
                className="
                    w-full
                    min-h-[46vh]
                    flex
                    items-center
                    justify-center
                    text-white
                "
            >
                Loading...
            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (isError) {

        return (
            <div
                id="Image"
                className="
                    w-full
                    min-h-[46vh]
                    flex
                    items-center
                    justify-center
                    text-white
                "
            >
                Weather image load nahi hui
            </div>
        );
    }


    // =========================
    // WEATHER IMAGE + NAME
    // =========================

    const getWeatherData = () => {

        // Agar weather data nahi hai
        if (!weather) {

            return {
                image: Sunny,
                name: "Sunny"
            };
        }


        const weatherCode = weather.weatherCode;
        const isDay = weather.isDay;


        // =========================
        // NIGHT
        // =========================

        if (isDay === 0) {

            // Clear night
            if (weatherCode === 0) {

                return {
                    image: Moon,
                    name: "Clear Night"
                };
            }


            // Cloudy night
            if (weatherCode >= 1 && weatherCode <= 3) {

                return {
                    image: Cloudy,
                    name: "Cloudy Night"
                };
            }


            // Rain night
            if (weatherCode >= 51 && weatherCode <= 67) {

                return {
                    image: Rain,
                    name: "Rain"
                };
            }


            // Rain showers night
            if (weatherCode >= 80 && weatherCode <= 82) {

                return {
                    image: Rain,
                    name: "Rain Showers"
                };
            }


            // Snow night
            if (weatherCode >= 71 && weatherCode <= 77) {

                return {
                    image: Snow,
                    name: "Snow"
                };
            }


            // Snow showers night
            if (weatherCode >= 85 && weatherCode <= 86) {

                return {
                    image: Snow,
                    name: "Snow Showers"
                };
            }


            // Default night
            return {
                image: Moon,
                name: "Clear Night"
            };
        }


        // =========================
        // DAY
        // =========================

        // Clear sky
        if (weatherCode === 0) {

            return {
                image: Sunny,
                name: "Sunny"
            };
        }


        // Cloudy
        if (weatherCode >= 1 && weatherCode <= 3) {

            return {
                image: Cloudy,
                name: "Cloudy"
            };
        }


        // Rain / Drizzle
        if (weatherCode >= 51 && weatherCode <= 67) {

            return {
                image: Rain,
                name: "Rain"
            };
        }


        // Rain showers
        if (weatherCode >= 80 && weatherCode <= 82) {

            return {
                image: Rain,
                name: "Rain Showers"
            };
        }


        // Snow
        if (weatherCode >= 71 && weatherCode <= 77) {

            return {
                image: Snow,
                name: "Snow"
            };
        }


        // Snow showers
        if (weatherCode >= 85 && weatherCode <= 86) {

            return {
                image: Snow,
                name: "Snow Showers"
            };
        }


        // Default
        return {
            image: Sunny,
            name: "Sunny"
        };
    };


    // Weather data nikalo
    const weatherData = getWeatherData();


    // =========================
    // UI
    // =========================

    return (

        <div
            id="Image"
            className="
                w-full
                min-h-[46vh]
                flex
                flex-col
                items-center
                justify-center
            "
        >

            {/* Weather Image */}

            <img
                src={weatherData.image}
                alt={weatherData.name}
                className="
                    w-[75%]
                    max-w-[20rem]
                    h-auto
                    object-contain
                "
            />


            {/* Weather Name */}

            <p
                className="
                    text-white
                    text-xl
                    font-medium
                    mt-2
                "
            >
                {weatherData.name}
            </p>

        </div>

    );
}


export default Image;