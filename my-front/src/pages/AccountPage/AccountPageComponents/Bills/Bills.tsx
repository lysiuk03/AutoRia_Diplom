// Libraries
import React from "react";

// Styles
import './Bills.css';



const Bills: React.FC = () => {
    return (
        <div className="bills-container">
            <h3>Особистий рахунок WheelDeal.ua: <span>102 000 грн</span></h3>
            <div>
            <button className="top-u-fix-button">
                10 000 грн
            </button>
            <button className="top-up-button">
                Поповнити
            </button>
            </div>
            <div className={"a-container"}>
            <a>Історія операцій</a>
            </div>
        </div>
    );
};

export default Bills;
