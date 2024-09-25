// Libraries
import React, { useEffect, useState } from 'react';

// Styles
import './HomeContent.css';

// Components
import CarLogoMenu from "./HomeContentComponents/CarLogosMenu/CarLogoMenu";
import Reviews from "./HomeContentComponents/Reviews/Reviews";
import Digest from "./HomeContentComponents/Digest/Digest";
import { Car } from "../../../../interfaces/Car";
import axios from "axios";
import CarCarousel from "./HomeContentComponents/CarCarousel/CarCarousel.tsx";

const HomeContent: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5174/api/Car');
                setCars(response.data);
            } catch (err) {
                setError('Не вдалося завантажити дані');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-comp">
            <div className="bg-img">
                <img src="/images/vector.png" alt="Vector"/>
            </div>
            <div className="title-1 content-title">
                <h3 className="titles">Автомобілі, <br/> які шукають найчастіше</h3>
            </div>

            <div className="center-width carousel-container">
                <CarCarousel cars={cars}/>
            </div>

            <div className="center-width logo-container">
                <CarLogoMenu/>
            </div>

            <div className="content-title title-2">
                <h3 className="titles">Автомобільний дайджест</h3>
            </div>
            <div className="center-width digest-container">
                <Digest/>
            </div>
            <div className="solid-container">
                <h3 className="titles">Відгуки наших клієнтів</h3>
                <Reviews/>
            </div>
        </div>

    );
};

export default HomeContent;
