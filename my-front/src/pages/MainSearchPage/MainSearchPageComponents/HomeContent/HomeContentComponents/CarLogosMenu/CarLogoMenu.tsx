// Libraries
import React from 'react';

// Styles
import './CarLogoMenu.css';
import axios from 'axios';
import { Car } from '../../../../../../interfaces/Car';
import { useNavigate } from 'react-router-dom';

const logos = [
    { name: 'Volkswagen', src: './images/carslogos/volkswagen.png' },
    { name: 'BMW', src: './images/carslogos/bmw.png' },
    { name: 'Mercedes-Benz', src: './images/carslogos/mercedes.png' },
    { name: 'Porshe', src: './images/carslogos/porsche.png' },
    { name: 'Lexus', src: './images/carslogos/lexus.png' },
    { name: 'Infiniti', src: './images/carslogos/infiniti.png' },
    { name: 'Suzuki', src: './images/carslogos/suzuki.png' },
    { name: 'Ford', src: './images/carslogos/ford.png' },
    { name: 'Mazda', src: './images/carslogos/mazda.png' },
    { name: 'Toyota', src: './images/carslogos/toyota.png' },
    { name: 'Fiat', src: './images/carslogos/fiat.png' },
    { name: 'Kia', src: './images/carslogos/kia.png' },
    { name: 'Nissan', src: './images/carslogos/nissan.png' },
    { name: 'MINI', src: './images/carslogos/mini.png' },
    { name: 'Renault', src: './images/carslogos/renault.png' },
    { name: 'Peugeot', src: './images/carslogos/peugeot.png' },
    { name: 'Audi', src: './images/carslogos/audi.png' },
    { name: 'Citroen', src: './images/carslogos/citroen.png' },
];

const CarLogoMenu: React.FC = () => {
    const navigate = useNavigate();

    const searchType = 'Будь-який';
    const carType = 'Будь-який';
    const selectedBrand: string = "";
    const region = 'Будь-який';
    const year = 'Будь-який';
    const price = 'Будь-який';
    const vinChecked = false;
    const selectedModel = 'Будь-який';


    const handleClick = async (name: string) => {

        const searchRequest = {
            searchType,
            carType,
            selectedBrand ,  // Use the clicked logo's brand
            selectedModel,
            region,
            year,
            price,
            vinChecked,
        };

        console.log('Selected brand:', name);
        searchRequest.selectedBrand = name;
        console.log('Search request:', searchRequest); // Check the search request

        try {
            const response = await axios.post<Car[]>('http://localhost:5174/api/Car/search', searchRequest);
            console.log(response.data); // Обробка отриманих даних
            navigate("/search", { state: { cars: response.data, text: searchRequest } });
        } catch (error) {
            console.error('Error during axios request:', error);
        }
    };

    const handleButtonClick = () => {
        // Logic for handling the "Більше" button can go here
        console.log('More button clicked');
    };

    return (
        <div className="logo-menu">
            {logos.map((logo) => (
                <div
                    key={logo.name}
                    className="logo-item"
                    onClick={() => handleClick(logo.name)}
                >
                    <img src={logo.src} alt={logo.name} />
                    <span>{logo.name}</span>
                </div>
            ))}
            <button className="more-button" onClick={handleButtonClick}>Більше</button>
        </div>
    );
};

export default CarLogoMenu;
