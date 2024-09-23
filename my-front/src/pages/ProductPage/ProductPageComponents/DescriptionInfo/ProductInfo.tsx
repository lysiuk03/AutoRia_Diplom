import React from 'react';
import "./DescriptionInfo.css"

const ProductInfo: React.FC = () => {
    return (
        <div className="info">
            <h2>BMW X6 M Competition</h2>
            <p>4.4 M-Steptronic (625 к.с.) M-xDrive Base 2024</p>
            <div className="like-price-container">
                <div className="price-container">
                    128 000 $ <span className="currency-span">· 5 171 200 грн</span>
                </div>
                <img src="/images/n-solid-like.png" alt="Like" className="like-image" />
            </div>
            <div className="description-container">
                <h4>Опис:</h4>
                <ul>
                    <li>Двигун - Бензин • 13.1 л на 100 км</li>
                    <li>Коробка передач - Автомат • 8-ст</li>
                    <li>Повний привід</li>
                    <li>Покоління - F96 (FL)</li>
                    <li>Колір кузова - Black Sapphire metallic</li>
                    <li>Кросовер-купе • 5 дверей • 5 місць</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductInfo;
