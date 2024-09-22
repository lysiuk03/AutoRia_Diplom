import React from 'react';
import "./ CreditVinSection.css"

const CreditVinSection: React.FC = () => {
    return (
        <div className="credit-vin-container">
            <div className="box-credit border">
                <img src="/images/monobank.png" alt="monobank" />
                <div>
                    <h2>Це авто доступно у кредит</h2>
                    <p>
                        Програма підтримки підприємств та ФОП в період війни. Про деталі угоди та розрахунок вас
                        проконсультують наші менеджери.
                    </p>
                    <button>Отримати консультацію</button>
                </div>
            </div>
            <div className="info-tags">
                <label>Доступно в лізинг</label>
                <label>Кредит до 1 року під 0.01%</label>
            </div>
            <div className="box-vin border">
                <h3>Перевірено WheelDeal разом із дилером</h3>
                <div className="vin-tags">
                    <label><img src="/images/car-log.png" alt="car-log" />Перевірений VIN</label>
                    <div className="vin-code">
                        <label><img src="/images/car-log.png" alt="car-log" /></label>
                        <span>WBS21ET0х09хххх08</span>
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
                        <p>BMW X6 M 2024</p>
                        <p>Бензин</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditVinSection;
