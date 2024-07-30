// CarCard.tsx
import React from 'react';
import './CarCard.css';
import {ICar} from "../../interfaces/carTypes.ts";
import { useNavigate } from 'react-router-dom';

const CarCardPage: React.FC<{car:ICar}> = ({car}) => {

    // const formattedPrice = new Intl.NumberFormat('en-US', {
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 0,
    //     useGrouping: true
    // }).format(price).replace(/,/g, ' ');
    const router = useNavigate();
    const handleClick = () => {
        router(`${car.id}`);
    };

    return (

        <div className="car-card" onClick={handleClick}>
        <div className="car-card-image">
        <img src={"../public/images/a3fa02da9f73608e54d4ffec35b3dcda.png"} alt={`${car.manufacturer} ${car.model}`} />
    </div>
            <div className="car-card-details">
                <h3>{`${car.manufacturer} ${car.model} ${'year'}`}</h3>
                <p>{`${'transmission'} • ${(car.mileage / 100).toFixed(1)} тис. км пробіг`}</p>

                <p className="car-card-price">{`${'formattedPrice'} $`}</p>
                <hr/>
                <p className="car-card-city">{'city'}</p>
                <div className="car-card-likes">
                    <span>{'likes'}</span>
                </div>
            </div>
        </div>
    );
};

export default CarCardPage;
