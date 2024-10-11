import React from 'react';
import './SearchCarCard.css';
import { Car } from '../../../../../interfaces/Car';
import { useNavigate } from 'react-router-dom';

const SearchCarCard: React.FC<Car> = ({
                                          carBrand,
                                          carModel,
                                          id,
                                          year,
                                          description,
                                          city,
                                          fuelTypes,
                                          mileage,
                                          photos
                                      }) => {
    const navigate = useNavigate();

    function formatMileage(mileage: number): string {
        if (mileage >= 1000) {
            const kilometers = mileage / 1000;
            return `${kilometers.toFixed(0)} тис. км`;
        }
        return `${mileage} км`;
    }

    function handleClick() {
        navigate(`/carproduct/${id}`);
    }

    return (
        <div className="search-car-card" onClick={handleClick}>
            <div className="search-car-card-img-container">
                <img
                    className="car-card-img"
                    src={`http://localhost:5174/images/1200_${photos[0]?.name || 'default-image.jpg'}`} // Added fallback for photo
                    alt={`${carBrand?.name || 'Бренд'} ${carModel?.name || 'Модель'} ${year || ''}`}
                />
            </div>
            <div className="search-car-details">
                <h3>{carBrand?.name || 'Бренд'} {carModel?.name || 'Модель'} {year || 'Рік не вказано'}</h3>
                <p>{description || 'Опис відсутній'}</p>
                <div className="price-and-like">
                    {/* <p className="price">{formatPrice(price)} $</p> */}
                    <img src="/images/n-solid-like.png" alt="Like" className="like-image" />
                </div>
                <hr />
                <div className="geo-fuel-mileage-container">
                    <p><img src="/images/geo.png" alt="Geo" />{city?.name || 'Інше місто'}</p>
                    <p><img src="/images/fuel.png" alt="Fuel" />{fuelTypes?.name || 'Тип палива не вказано'}</p>
                    <p><img src="/images/mileage.png" alt="Mileage" />{formatMileage(mileage)}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchCarCard;
