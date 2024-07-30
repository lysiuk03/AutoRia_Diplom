// src/pages/CarCardListPage.tsx
import React, { useState, useEffect } from 'react';
import CarCardPage from "../CarCard/CarCardPage.tsx";
import {ICar} from "../../interfaces/carTypes.ts";
import './CarCardList.css';


const CarCardListPage: React.FC = () => {
    const [cars, setCars] = useState<ICar[]>([]);

    useEffect(() => {
        fetch('http://localhost:5174/api/Car')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching car data:', error));
    }, []);

    return (
        <div className="car-card-list-page">
            <div className="car-card-list">

                {cars.map(car => (
                        <CarCardPage key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default CarCardListPage;
