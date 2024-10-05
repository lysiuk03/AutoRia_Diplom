import React from 'react';
import { Car } from "../../interfaces/Car"; // Ensure this interface matches the structure
import './CarCard.css';
import {useNavigate} from "react-router-dom";



const CarCard: React.FC<Car> = ({
                                    carBrand, // This is an object, not a string.
                                    carModel, // This is also an object.
                                    year,
                                    id,
                                    city,
                                    mileage,
                                    transmissionType,
                                    photos,
                                    height = 386,
                                    width = 290
                                }) => {

    const navigate = useNavigate();

    function formatMileage(mileage: number): string {
        if (mileage >= 1000) {
            const kilometers = mileage / 1000;
            return `${kilometers.toFixed(0)} тис. км пробіг`;
        }
        return `${mileage} км пробіг`;
    }

    // Function to handle card click
    const handleClick = () => {
        navigate(`/carproduct/${id}`); // Navigate to the car product page with the car ID
    };


    return (
        <div className="car-card" onClick={handleClick} style={{ width: `${width}px`, height: `${height}px` }}>
            <div className="content">
                <div>
                    {photos && photos[0]?.name ? (
                        <img
                            className="img-car"
                            src={`http://localhost:5174/images/200_${photos[0].name}`}
                            alt={`${carBrand?.name || ''} ${carModel?.name || ''} ${year}`}
                        />
                    ) : (
                        <img
                            className="img-car"
                            src="/images/default-car.png"
                            alt="Default Car"
                        />
                    )}
                </div>
                <div className="car-details">
                    <h3>
                        {carBrand?.name || 'Невідомий бренд'} {carModel?.name || 'Невідома модель'} {year}
                    </h3>
                    <p>
                        {transmissionType?.name || 'Невідома трансмісія'} &#8729; {formatMileage(mileage)}
                    </p>
                    <hr />
                    <p>
                        <img src="/images/geo.png" alt="Geo" className="geo-image" />
                        {city?.name || 'Невідоме місто'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
