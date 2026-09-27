import { useQuery } from '@tanstack/react-query';


function Weekday({ selectedState, selectedCity }) {

    const {
        data: forecast,
        isFetching,
        isError
    } = useQuery({

        queryKey: [
            "forecast",
            selectedState,
            selectedCity
        ],

        queryFn: async () => {

            const response = await fetch(
                `http://10.118.169.102:5000/api/Weather/forecast?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
            );

            if (!response.ok) {
                throw new Error("Forecast data nahi mila");
            }

            return response.json();
        },

        enabled: !!selectedState && !!selectedCity,

        // 40 seconds mein background refresh
        refetchInterval: 40000
    });


    const daily = forecast?.daily;


    // --------------------------------
    // Weather Icon
    // --------------------------------

    const getWeatherIcon = (weatherCode) => {

        if (weatherCode === 0) {
            return "☀️";
        }

        if (weatherCode >= 1 && weatherCode <= 3) {
            return "☁️";
        }

        if (weatherCode >= 51 && weatherCode <= 67) {
            return "🌧️";
        }

        if (weatherCode >= 80 && weatherCode <= 82) {
            return "🌧️";
        }

        if (weatherCode >= 71 && weatherCode <= 77) {
            return "❄️";
        }

        if (weatherCode >= 85 && weatherCode <= 86) {
            return "🌨️";
        }

        return "☁️";
    };


    // --------------------------------
    // Date → Day Name
    // --------------------------------

    const getDayName = (date) => {

        const [year, month, day] = date
            .split("-")
            .map(Number);

        return new Date(
            year,
            month - 1,
            day
        ).toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );
    };


    // --------------------------------
    // Days prepare karo
    // --------------------------------

    let orderedDays = [];


    if (daily?.time) {

        const days = daily.time.map((date, index) => {

            return {

                date: date,

                weatherCode:
                    daily.weather_code[index],

                temperature:
                    daily.temperature_2m_max[index]

            };

        });


        // Aaj ka day
        const today = new Date();

        const todayName = today.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );


        // Aaj ka index
        const todayIndex = days.findIndex((item) => {

            return getDayName(item.date) === todayName;

        });


        // Aaj se start
        if (todayIndex !== -1) {

            orderedDays = [

                ...days.slice(todayIndex),

                ...days.slice(0, todayIndex)

            ];

        } else {

            orderedDays = days;

        }

    }


    return (

        <div
            id="Weekday"

            className="
                w-full
                min-h-[46vh]
                flex
                items-center
                justify-center
            "
        >

            {/* MAIN CARD */}

            <div
                className="
                    relative
                    w-full
                    h-[43vh]
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-xl
                    p-[1.5vw]
                    flex
                    flex-col
                    justify-between
                "
            >

                {/* -------------------------------- */}
                {/* First time loading */}
                {/* -------------------------------- */}

                {orderedDays.length === 0 && !isError && (

                    <div
                        className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            text-gray-400
                        "
                    >
                        Loading...
                    </div>

                )}


                {/* -------------------------------- */}
                {/* Error */}
                {/* -------------------------------- */}

                {isError && orderedDays.length === 0 && (

                    <div
                        className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            text-gray-400
                        "
                    >
                        Forecast load nahi hua
                    </div>

                )}


                {/* -------------------------------- */}
                {/* Weather Data */}
                {/* -------------------------------- */}

                {orderedDays.map((item) => (

                    <div
                        key={item.date}

                        className="
                            flex
                            items-center
                            justify-between
                            px-[1vw]
                        "
                    >

                        {/* Day */}

                        <span>
                            {getDayName(item.date)}
                        </span>


                        {/* Icon */}

                        <span>
                            {getWeatherIcon(
                                item.weatherCode
                            )}
                        </span>


                        {/* Temperature */}

                        <span>
                            {Math.round(
                                item.temperature
                            )}°
                        </span>

                    </div>

                ))}


                {/* -------------------------------- */}
                {/* Background Updating */}
                {/* -------------------------------- */}

                {isFetching && orderedDays.length > 0 && (

                    <span
                        className="
                            absolute
                            top-2
                            right-3
                            text-[10px]
                            text-gray-500
                        "
                    >
                        Updating...
                    </span>

                )}

            </div>

        </div>
    );
}


export default Weekday;