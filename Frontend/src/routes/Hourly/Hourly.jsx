import { useQuery } from '@tanstack/react-query';

function Hourly({ selectedState, selectedCity }) {

    const {
        data: forecast,
        isFetching,
        isError
    } = useQuery({

        queryKey: [
            "hourly",
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

        enabled:
            !!selectedState &&
            !!selectedCity,

        // 40 seconds ke baad data update
        refetchInterval: 40000

    });


    const hourly = forecast?.hourly;


    // ========================================
    // NEXT 8 HOURS DATA
    // ========================================

    let data = [];

    if (
        hourly &&
        hourly.time &&
        hourly.temperature_2m
    ) {

        const currentHour =
            new Date().getHours();


        const currentIndex =
            hourly.time.findIndex((time) => {

                const hour =
                    new Date(time).getHours();

                return hour === currentHour;

            });


        const startIndex =
            currentIndex === -1
                ? 0
                : currentIndex;


        data =
            hourly.time
                .slice(
                    startIndex,
                    startIndex + 8
                )
                .map((time, index) => {

                    const actualIndex =
                        startIndex + index;


                    return {

                        time: time,

                        temp:
                            hourly.temperature_2m[
                            actualIndex
                            ]

                    };

                });

    }


    // ========================================
    // TIME FORMAT
    // ========================================

    const formatTime = (time) => {

        const date =
            new Date(time);


        return date.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        );

    };


    // ========================================
    // GRAPH Y POSITION
    // ========================================

    const getGraphY = (temp) => {

        const temperatures =
            data.map(
                (item) => item.temp
            );


        const minTemp =
            Math.min(...temperatures);


        const maxTemp =
            Math.max(...temperatures);


        // Agar sab temperature same hain
        if (
            maxTemp === minTemp
        ) {

            return 50;

        }


        return (
            85 -
            (
                (temp - minTemp) /
                (maxTemp - minTemp)
            ) * 60
        );

    };


    // ========================================
    // GRAPH POINTS
    // ========================================

    const points =
        data.map(
            (item, index) => {

                const x =
                    data.length === 1
                        ? 400
                        : (
                            index /
                            (data.length - 1)
                        ) * 800;


                const y =
                    getGraphY(
                        item.temp
                    );


                return {
                    x,
                    y
                };

            }
        );


    // ========================================
    // SVG PATH
    // ========================================

    let path = "";


    points.forEach(
        (point, index) => {

            // First point
            if (index === 0) {

                path =
                    `M ${point.x} ${point.y}`;

            }

            // Other points
            else {

                const previous =
                    points[index - 1];


                const controlX =
                    (
                        previous.x +
                        point.x
                    ) / 2;


                path += `
                    C
                    ${controlX} ${previous.y},
                    ${controlX} ${point.y},
                    ${point.x} ${point.y}
                `;

            }

        }
    );


    // ========================================
    // UI
    // ========================================

    return (

        <div
            className="
                relative
                w-full
                h-[26.7vh]
                min-h-[30%]
                rounded-2xl
                bg-white/5
                backdrop-blur-xl
                p-[2vw]
                overflow-hidden
            "
        >


            {/* ================================= */}
            {/* UPDATING */}
            {/* ================================= */}

            {isFetching &&
                data.length > 0 && (

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


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {data.length === 0 &&
                !isError && (

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


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {isError &&
                data.length === 0 && (

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


            {/* ================================= */}
            {/* WEATHER DATA */}
            {/* ================================= */}

            {data.length > 0 && (

                <div className="w-full h-full">


                    {/* =========================== */}
                    {/* TEMPERATURE */}
                    {/* =========================== */}

                    <div
                        className="
                            w-full
                            flex
                            justify-between
                            items-center
                        "
                    >

                        {data.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="
                                        text-gray-300
                                        text-sm
                                        sm:text-base
                                        font-medium
                                    "
                                >

                                    {Math.round(
                                        item.temp
                                    )}°

                                </div>

                            )
                        )}

                    </div>


                    {/* =========================== */}
                    {/* GRAPH */}
                    {/* =========================== */}

                    <div
                        className="
                            relative
                            w-full
                            h-[8vh]
                            mt-[1vh]
                        "
                    >

                        <svg
                            viewBox="0 0 800 100"
                            preserveAspectRatio="none"
                            className="
                                absolute
                                inset-0
                                w-full
                                h-full
                            "
                        >

                            <path
                                d={path}
                                fill="none"
                                stroke="rgba(255,255,255,0.25)"
                                strokeWidth="2"
                            />

                        </svg>

                    </div>


                    {/* =========================== */}
                    {/* TIME */}
                    {/* =========================== */}

                    <div
                        className="
                            w-full
                            flex
                            justify-between
                            items-center
                            mt-[2vh]
                        "
                    >

                        {data.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="
                                        text-sm
                                        text-white
                                        font-medium
                                        text-center
                                    "
                                >

                                    {formatTime(
                                        item.time
                                    )}

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>

    );

}


export default Hourly;