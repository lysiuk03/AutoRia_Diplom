// Libraries
import React, {useEffect, useState} from 'react';

// Interfaces
import { Car } from "../../../../../../interfaces/Car";

// Components
import CarCard from '../../../../../../components/carCard/CarCard';

// Styles
import '../CarCarousel/CarCarousel.css';

// Define props interface
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

    const [imageSrc, setImageSrc] = useState("/images/left.png");
    const [rotation, setRotation] = useState("");
    useEffect(() => {
        const updateImageSrc = () => {
            if (window.innerWidth <= 1620) {
                setImageSrc("/images/left.png"); // Change to small image
                setRotation("rotate(180deg)"); // Apply rotation for smaller screens
            } else {
                setImageSrc("/images/right.png"); // Use the default image
                setRotation("");
            }
        };

        // Initial check when the component loads
        updateImageSrc();

        // Listen for window resize events
        window.addEventListener('resize', updateImageSrc);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateImageSrc);
        };
    }, []);


    return (
        <>
            <button onClick={handlePrev} className="arrow btn-none-styles" disabled={currentIndex === 0}>
                <img src="/images/left.png" alt="Left" />
            </button>
            <div className="cars-container">
                {cars.slice(currentIndex, currentIndex + 4).map((car, index) => (
                    <CarCard key={index} {...car} />
                ))}
            </div>
            <button
                onClick={handleNext}
                className="arrow btn-none-styles"
                disabled={currentIndex >= cars.length - 4}>
                <img src={imageSrc} alt="Left" style={{ transform: rotation }}/>

            </button>
        </>
    );
}

export default CarCarousel;
