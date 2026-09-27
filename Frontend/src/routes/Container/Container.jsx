import Celsius from '../Celsius/Celsius'
import Image from '../Image/Image'
import Weekday from '../Weekday/Weekday'
import Hourly from '../Hourly/Hourly'

function Container({ selectedState, selectedCity }) {
    return (
        <main
            id="WeatherContainer"
            className="
                w-full
                pt-[7vh]
                pb-[6vh]
            "
        >

            <div
                className="
                    w-[92%]
                    lg:w-[88%]
                    xl:w-[80%]

                    mx-auto

                    grid
                    grid-cols-3

                    gap-[3vw]

                    items-center
                "
            >

                <Celsius
                    selectedState={selectedState}
                    selectedCity={selectedCity}
                />

                <Image

                    selectedState={selectedState}
                    selectedCity={selectedCity}
                />

                <Weekday
                    selectedState={selectedState}
                    selectedCity={selectedCity}
                />


            </div>

            <div
                className="
                    w-[92%]
                    lg:w-[88%]
                    xl:w-[80%]

                    mx-auto

                    mt-[6vh]
                "
            >
                <Hourly
                    selectedState={selectedState}
                    selectedCity={selectedCity}
                />
            </div>

        </main>
    )
}

export default Container