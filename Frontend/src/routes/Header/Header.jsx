import { useQuery } from "@tanstack/react-query"
import Logo from "./Img/logo.png"


function Header({
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity
}) {


    const {
        data: indiaData = [],
        isLoading,
        isError,
        error
    } = useQuery({

        queryKey: ["locations"],

        queryFn: async () => {

            const res = await fetch(
                "http://10.118.169.102:5000/api/Weather/locations"
            )


            if (!res.ok) {

                throw new Error(
                    "Data fetch nahi hua"
                )

            }


            return res.json()

        }

    })


    const selectedLocation = indiaData.find(
        (location) =>
            location.state === selectedState
    )


    const cities = selectedLocation?.cities || []


    const handleStateChange = (e) => {

        const state = e.target.value


        setSelectedState(state)

        localStorage.setItem(
            "selectedState",
            state
        )


        setSelectedCity("")

        localStorage.removeItem(
            "selectedCity"
        )

    }


    const handleCityChange = (e) => {

        const city = e.target.value


        setSelectedCity(city)

        localStorage.setItem(
            "selectedCity",
            city
        )

    }


    return (

        <div
            className="
                w-full
                h-15
                flex
                justify-center
                items-center
                px-2
                sm:px-4
            "
        >

            <header
                className="
                    relative
                    w-full
                    sm:w-[80%]
                    md:w-[60%]
                    lg:w-[45%]
                    xl:w-[30%]
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    px-2
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/10
                    overflow-hidden
                "
            >


                <nav className="shrink-0">

                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-9 sm:w-10"
                    />

                </nav>



                <div
                    className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        flex
                        items-center
                        gap-3
                        sm:gap-6
                        text-sm
                        sm:text-base
                        whitespace-nowrap
                    "
                >


                    {/* STATE */}

                    <select
                        value={selectedState}
                        onChange={handleStateChange}

                        className="
                            max-w-[45%]
                            ml-12
                            min-w-0
                            h-8
                            rounded-lg
                            text-black
                            px-2
                            text-center
                            appearance-none
                            border-0
                            outline-none
                            focus:outline-none
                            focus:ring-0
                            focus:border-transparent
                        "
                    >

                        <option value="">
                            Select State
                        </option>


                        {indiaData.map((location) => (

                            <option
                                key={location._id}
                                value={location.state}
                            >

                                {location.state}

                            </option>

                        ))}

                    </select>



                    {/* CITY */}

                    <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        disabled={!selectedState}

                        className="
                            text-center
                            appearance-none
                            outline-none
                            focus:outline-none
                            focus:ring-0
                            focus:border-transparent
                        "
                    >

                        <option value="">
                            Select City
                        </option>


                        {cities.map((city) => (

                            <option
                                key={city}
                                value={city}
                            >

                                {city}

                            </option>

                        ))}

                    </select>


                </div>

            </header>

        </div>

    )
}


export default Header