import { useQuery } from '@tanstack/react-query';

function Celsius({ selectedState, selectedCity }) {
    const {
        data: weather,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: [
            "weather",
            selectedState,
            selectedCity
        ],
        queryFn: async () => {

            const response = await fetch(
                `http://10.118.169.102:5000/api/Weather?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
            )

            if (!response.ok) {
                throw new Error("Weather data nahi mila")
            }

            return response.json()
        },

        enabled: !!selectedState && !!selectedCity,
        refetchInterval: 4000
    })
    const getAirQualityStatus = (aqi) => {
        if (aqi === undefined || aqi === null) {
            return "--";
        }

        if (aqi <= 50) return "Good";
        if (aqi <= 100) return "Satisfactory";
        if (aqi <= 200) return "Moderate";
        if (aqi <= 300) return "Poor";
        if (aqi <= 400) return "Very Poor";

        return "Severe";
    };

    return (

        <div
            className="
                w-full
                min-h-[46vh]
                flex
                flex-col    
                gap-[2vh]
            "
            id="Celsius"
        >

            <div
                className="
                    w-full
                    h-[29vh]
                    min-h-[40%]
                    bg-white/10
                    backdrop-blur-xl
                    rounded-2xl
                    p-[2vw]
                    flex
                    items-center
                    justify-center
                    flex-col
                "
            >

                <p className="text-gray-400 text-sm">
                    Temperature
                </p>

                <h1
                    className="
                        text-[clamp(2.5rem,5vw,4rem)]
                        font-bold
                        mt-[2vh]
                    "
                >
                    {weather ? weather.temperature : "--"}°C
                </h1>

                <p className="text-gray-400 mt-[1vh]">
                    {weather ? weather.condition : "Loading..."}
                </p>

            </div>


            <div
                className="
                    grid
                    grid-cols-3
                    gap-[1vw]
                    flex-1
                "
            >

                <div
                    className="
                        min-h-[13vh]
                        bg-white/10
                        backdrop-blur-xl
                        rounded-2xl
                        p-[1vw]
                        flex
                        items-center
                        justify-center
                        flex-col
                    "
                >

                    <p className="text-gray-400 text-xs text-center">
                        Wind Speed
                    </p>

                    <h2 className="text-lg font-semibold mt-[1vh]">
                        {weather ? weather.windSpeed : "--"}
                    </h2>

                    <span className="text-sm">
                        km/h
                    </span>

                </div>


                <div
                    className="
                        min-h-[13vh]
                        bg-white/10
                        backdrop-blur-xl
                        rounded-2xl
                        p-[1vw]
                        flex
                        items-center
                        justify-center
                        flex-col
                    "
                >

                    <p className="text-gray-400 text-xs text-center">
                        Humidity
                    </p>

                    <h2 className="text-lg font-semibold mt-[1vh]">
                        {weather ? weather.humidity : "--"}%
                    </h2>

                </div>


                <div
                    className="
                        min-h-[13vh]
                        bg-white/10
                        backdrop-blur-xl
                        rounded-2xl
                        p-[1vw]
                        flex
                        items-center
                        justify-center
                        flex-col
                    "
                >

                    <p className="text-gray-400 text-xs text-center">
                        Air Quality
                    </p>

                    <h2 className="text-lg font-semibold mt-[1vh]">
                        {weather ? weather.airQuality : "--"}
                    </h2>
                    <span>
                        {weather ? getAirQualityStatus(weather.airQuality) : "--"}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default Celsius;