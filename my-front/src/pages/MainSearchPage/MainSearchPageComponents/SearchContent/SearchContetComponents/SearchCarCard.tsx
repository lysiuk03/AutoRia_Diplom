// Libraries
import React from 'react';

// Styles
import './SearchCarCard.css';

// Interfaces
import { Car } from '../../../../../interfaces/Car';



const SearchCarCard: React.FC<Car> = ({
                                          year,
                                          model,
                                          manufacturer,
                                          mileage,
                                          description,
                                          fuelTypes,
                                          photos,
                                          city,
                                          price
                                      }) => {
    function formatMileage(mileage: number): string {
        if (mileage >= 1000) {
            const kilometers = mileage / 1000;
            return `${kilometers.toFixed(0)} тис. км`;
        }
        return `${mileage} км`;
    }

    function formatPrice(price: number | undefined): string {
        if (price == undefined) {
            return 'Ціна не вказана';
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className="search-car-card">

            <div className="search-car-card-img-container">
                <img className="car-card-img" src={`http://localhost:5174/images/1200_${photos[0]}`}  alt={`${manufacturer} ${model} ${year}`}/>
            </div>
            <div className="search-car-details">
                <h3>{manufacturer} {model} {year}</h3>
                <p>{description}</p>
                <div className="price-and-like">
                    <p className="price">{formatPrice(price)} $</p>
                    <img src="/images/n-solid-like.png" alt="Like" className="like-image"/>
                </div>
                <hr/>
                <div className="geo-fuel-mileage-container">
                    <p> <img src="/images/geo.png" alt="Geo" />{city}</p>
                    <p> <img src="/images/fuel.png" alt="Fuel"/>{fuelTypes}</p>
                    <p> <img src="/images/mileage.png" alt="Mileage"/>{formatMileage(mileage)}</p>
                </div>
            </div>
        </div>
    );
}

export default SearchCarCard;