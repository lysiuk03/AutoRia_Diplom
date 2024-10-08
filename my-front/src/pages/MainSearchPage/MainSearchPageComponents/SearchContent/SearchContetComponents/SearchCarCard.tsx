// Libraries
import React from 'react';

// Styles
import './SearchCarCard.css';

// Interfaces
import { Car } from '../../../../../interfaces/Car';
import {useNavigate} from "react-router-dom";



const SearchCarCard: React.FC<Car> = ({
                                          carBrand,
                                          carModel,
                                          id,
                                          year,
                                          description,
                                          city,
                                          fuelTypes,
                                          mileage,
                                          photos,

                                      }) => {
    const navigate = useNavigate();
    function formatMileage(mileage: number): string {
        if (mileage >= 1000) {
            const kilometers = mileage / 1000;
            return `${kilometers.toFixed(0)} тис. км`;
        }
        return `${mileage} км`;

    }
    // function formatPrice(price: number | undefined): string {
    //     if (price == undefined) {
    //         return 'Ціна не вказана';
    //     }
    //     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // }

    function handleClick() {
        navigate(`/carproduct/${id}`);
    }

    return (
        <div className="search-car-card" onClick={handleClick}>

            <div className="search-car-card-img-container">
                <img className="car-card-img" src={`http://localhost:5174/images/1200_${photos[0].name} `}  alt={`${carBrand.name} ${carModel.name} ${year}`}/>
            </div>
            <div className="search-car-details">
                <h3>{carBrand.name} {carModel.name} {year}</h3>
                <p>{description}</p>
                <div className="price-and-like">
                    {/*<p className="price">{formatPrice(price)} $</p>*/}
                    <img src="/images/n-solid-like.png" alt="Like" className="like-image"/>
                </div>
                <hr/>
                <div className="geo-fuel-mileage-container">
                    <p> <img src="/images/geo.png" alt="Geo" />{city ? city.name : "Інше місто"}</p>
                    <p> <img src="/images/fuel.png" alt="Fuel"/>{fuelTypes.name}</p>
                    <p> <img src="/images/mileage.png" alt="Mileage"/>{formatMileage(mileage)}</p>
                </div>
            </div>
        </div>
    );
}

export default SearchCarCard;