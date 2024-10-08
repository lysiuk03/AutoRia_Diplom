import React from 'react';
import "./ CreditVinSection.css"
import { ProductInfoProps } from '../../../../interfaces/Car';



const CreditVinSection:  React.FC<ProductInfoProps> = ({ car }) => {

    if (!car) {
        return <div>Loading...</div>; 
    }

    const {
        vin,
        carBrand,
        carModel,
        year,
        fuelTypes,
    } = car;

    return (
        <div className="credit-vin-container">
            <div className="box-credit border">
                <img src="/images/monobank.png" alt="monobank" />
                <div>
                    <h2>Це авто доступно у кредит</h2>
                    <p>
                        Програма підтримки підприємств та ФОП в період війни. Про деталі угоди та розрахунок вас
                        проконсультують менеджери mono.
                    </p>
                    <a href="https://monobank.ua/business/support-during-war">Отримати консультацію</a>
                </div>
            </div>
            <div className="info-tags">
                <label>Доступно в кредит з низькими відсотками</label>
            </div>
            <div className="box-vin border">
                <h3>VIN (Vehicle Identification Number)</h3>
                <div className="vin-tags">
                    <label><img src="/images/car-log.png" alt="car-log" />VIN</label>
                    <div className="vin-code">
                        <label><img src="/images/car-log.png" alt="car-log" /></label>
                        <span>{vin}</span>
                    </div>
                </div>
                <div className="check-vin-characteristics">
                    <div>
                        <p className="color-gray">
                            <img src="/images/checkmark-green.png" alt="checkmark" />Марка, модель, рік
                        </p>
                        <p className="color-gray">
                            <img src="/images/checkmark-green.png" alt="checkmark" />Двигун
                        </p>
                    </div>
                    <div>
                        <p>{carBrand.name} {carModel.name} {year}</p>
                        <p>{fuelTypes.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditVinSection;
