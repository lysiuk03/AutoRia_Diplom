import React from 'react';
import "./CompanyInfo.css"
import { ProductInfoProps } from '../../../../interfaces/Car';

const CompanyInfo: React.FC<ProductInfoProps> = ({ car }) => {
    if (!car) {
        return <div>Loading...</div>;
    }

    const {
        user,
        city,
    } = car;

    const copyPhoneNumber = () => {
        navigator.clipboard.writeText(user.phoneNumber.toString())
            .then(() => {
                alert("Номер телефону скопійовано: " + user.phoneNumber);
            })
            .catch(err => {
                console.error('Не вдалося скопіювати номер телефону: ', err);
            });
    };
    const photouser = `http://localhost:5174/images/200_${car.user.photo}`;

    return (
        <div className="box-company border">
            <div className="company">
                <img src={photouser} alt="Company" className="company-img" />
                <div className="company-name">

                    <h3>{user.firstName} {user.lastName}</h3>
                </div>
            </div>
            <div className="row-info">
                <img src="/images/mileage.png" alt="Time" />
                <p>Готовий допомогти</p>
            </div>
            <div>
                <div className="row-info">
                    <img src="/images/geo.png" alt="Geo" />
                    <p>{city ? city.name : "Невідоме місто"}</p>
                </div>
                <h4 className="h4-style">Працює з WheelDeal</h4>
            </div>
            <div className="contacts-company">
                <p>{user.phoneNumber}</p>
                <small>контактний телефон</small>
            </div>
            <div className="contacts-company">
                <p>{user.email}</p>
                <small>поштова адреса</small>
            </div>
            <button className="btn-salon" onClick={copyPhoneNumber}>
                Зателефонувати <img src="/images/chat.png" alt="Chat" />
            </button>
        </div>
    );
};

export default CompanyInfo;