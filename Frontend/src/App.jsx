import { useState } from 'react'
import './App.css'
import Header from './routes/Header/Header'
import Container from './routes/Container/Container'

function App() {
    const [selectedState, setselectedState] = useState(
        localStorage.getItem("selectedState") || ""
    );
    const [selectedCity, setselectedCity] = useState(
        localStorage.getItem("selectedCity") || ""
    );
    return (
        <div className="App">

            <Header
                selectedState={selectedState}
                setSelectedState={setselectedState}
                selectedCity={selectedCity}
                setSelectedCity={setselectedCity}

            />

            <Container 
               selectedState={selectedState}
                selectedCity={selectedCity}
            />

        </div>
    )
}

export default App