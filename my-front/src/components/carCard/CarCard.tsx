// Libraries
import React from 'react';

// Interfaces
import { Car } from "../../interfaces/Car";

// Styles
import './CarCard.css';


const CarCard: React.FC<Car> = ({
                                    year,
                                    model,
                                    manufacturer,
                                    mileage,
                                    transmissionType,
                                    photos,
                                    city,
                                    price,
                                    height = 386,
                                    width = 290
                                }) => {
    function formatMileage(mileage: number): string {
        if (mileage >= 1000) {
            const kilometers = mileage / 1000;
            return `${kilometers.toFixed(0)} тис. км пробіг`;
        }
        return `${mileage} км пробіг`;
    }
    function formatPrice(price: number | undefined): string {
        if (price == undefined) {
            return 'Ціна не вказана';
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className="car-card" style={{ width: `${width}px`, height: `${height}px` }}>
            <div className="content">
                <div>
                    <img className="img-car" src={photos[0]} alt={`${manufacturer} ${model} ${year}`}/>
                    <div className="like-circle-1">
                        <div className="like-circle-2">
                            <div className="content">
                           <img src="/images/heart.png" alt="Heart" />
                            <span>2.1k</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="car-details">
                    <h3>{manufacturer} {model} {year}</h3>
                    <p>{transmissionType} &#8729; {formatMileage(mileage)}</p>
                    <p className="price">{formatPrice(price)} $</p>
                    <hr/>
                    <p> <img src="/images/geo.png" alt="Geo" className="geo-image"/>{city}</p>
                </div>
            </div>
        </div>
    );
}

export default CarCard;
