// Libraries
import React from "react";

// Styles
import './Bills.css';



const Bills: React.FC = () => {
    return (
        <div className="bills-container">
            <h3>Особистий рахунок WheelDeal.ua: <span>102 000 грн</span></h3>
            <input
                type="number"
                placeholder="10 000 грн"
            />
            <div>
            <button className="top-up-button">
                10 000 грн
            </button>
            <button className="top-up-button">
                Поповнити
            </button>
            </div>
            <a>Історія операцій</a>
        </div>
    );
};

export default Bills;
