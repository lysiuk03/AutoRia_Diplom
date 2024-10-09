import React from 'react';
import "./DescriptionInfo.css";
import { ProductInfoProps } from '../../../../interfaces/Car';


const convertToUAH = (price: number): string => {
    const exchangeRate = 40;
    return (price * exchangeRate).toLocaleString('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const ProductInfo: React.FC<ProductInfoProps> = ({ car }) => {

    if (!car) {
        return <div>Loading...</div>;
    }

    const {
        carBrand,
        carModel,
        engineVolume,
        stage,
        numberOfSeats,
        year,
        price,
        fuelTypes,
        transmissionType,
        color,
        bodyType,
        transportType,
    } = car;

    return (
        <div className="info">
            <h2>{carBrand.name} {carModel.name}</h2>
            <p>{engineVolume.volume} л {stage} {numberOfSeats.number} місць {year}</p>
            <div className="like-price-container">
                <div className="price-container">
                    {price} $ <span className="currency-span">· {convertToUAH(price)}</span>
                </div>
            </div>
            <div className="description-container">
                <h4>Опис:</h4>
                <ul>
                    <li>Двигун - {fuelTypes.name}</li>
                    <li>Коробка передач - {transmissionType.name}</li>
                    <li>Покоління - {carModel.name}</li>
                    <li>Колір кузова - {color.color}</li>
                    <li>{bodyType.name} • {transportType.name} • кількість місць - {numberOfSeats.number}</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductInfo;