// Libraries
import React from "react";

// Styles
import './MyAds.css';

// Local Files
import { cars } from "../../../../data/cars";
import CarCard from "../../../../components/carCard/CarCard";
import { Car } from "../../../../interfaces/Car";



const MyAds: React.FC = () => {

    return (
        <div className="my-ads-container">
            <div className="cars-grid">
                {cars.map((car: Car, index: number) => (
                    <CarCard
                        key={index}
                        {...car}
                        height={400}
                        width={357}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyAds;
