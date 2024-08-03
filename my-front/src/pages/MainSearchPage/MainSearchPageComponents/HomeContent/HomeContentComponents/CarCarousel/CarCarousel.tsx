// Libraries
import React, { useState } from 'react';

// Interfaces
import { Car } from "../../../../../../interfaces/Car";

// Components
import CarCard from '../../../../../../components/carCard/CarCard';

// Styles
import './CarCarousel.css';

interface CarCarouselProps {
    cars: Car[];
}

const CarCarousel: React.FC<CarCarouselProps> = ({ cars }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < cars.length - 4) {
            setCurrentIndex(currentIndex + 4);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 4);
        }
    };

    return (
        <>
            <button onClick={handlePrev} className="arrow left-arrow btn-none-styles" disabled={currentIndex === 0}>
                <img src="/images/left.png" alt="Left" />
            </button>
            <div className="center-width cars-container">
                {cars.slice(currentIndex, currentIndex + 4).map((car, index) => (
                    <CarCard key={index} {...car} />
                ))}
            </div>
            <button onClick={handleNext} className="arrow right-arrow btn-none-styles" disabled={currentIndex >= cars.length - 4}>
                <img src="/images/right.png" alt="Right" />
            </button>
        </>
    );
}

export default CarCarousel;
