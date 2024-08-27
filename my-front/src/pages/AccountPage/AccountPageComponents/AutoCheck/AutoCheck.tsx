// Libraries
import React, { useState } from "react";

// Styles
import './AutoCheck.css';

const AutoCheck: React.FC = () => {
    const [adId, setAdId] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdId(e.target.value);
    };

    const handleCheckById = () => {
        console.log(`Перевірка по ID: ${adId}`);
    };

    const handleCheckNotWheelDeal = () => {
        console.log('Перевірка для авто не з WheelDeal');
    };

    return (
        <div className="auto-check-container">
            <h3>Результати перевірок авто</h3>
            <p>
                Перевірені авто — гарантія того, що автомобіль не має «темного минулого»,
                а його ціна відповідає якості. WheelDeal перевіряє технічний стан авто
                та його юридичну «чистоту», а VIN-код — на історію пробігу, арешти,
                викрадення, кредити, тощо.
            </p>
            <div className="check-options">
                <button onClick={handleCheckById} className="by-id-btn">Перевірити по ID</button>
                <button onClick={handleCheckNotWheelDeal} className="not-by-btn">Авто не з WheelDeal</button>
            </div>
            <input
                type="number"
                placeholder="ID оголошення"
                value={adId}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default AutoCheck;
