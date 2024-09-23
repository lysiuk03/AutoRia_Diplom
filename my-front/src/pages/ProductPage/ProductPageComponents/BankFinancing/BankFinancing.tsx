import React from 'react';
import './BankFinancing.css';

const BankFinancing: React.FC = () => {
    return (
        <div className="bank-financing-container">
            <div className="financing-header">
                <img src="/images/money.png" alt="Finance Icon" />
                <h4>ПІДБІР ФІНАНСУВАННЯ АВТО ВІД БАНКІВ</h4>
            </div>
            <div className="financing-options">
                <div className="financing-option">
                    <label>Перший внесок</label>
                    <select>
                        <option>1 630 435 грн / 20%</option>
                        <option>1 000 000 грн / 15%</option>
                        <option>800 000 грн / 10%</option>
                    </select>
                </div>
                <div className="financing-option">
                    <label>Термін кредиту</label>
                    <select>
                        <option>1 рік</option>
                        <option>2 роки</option>
                        <option>3 роки</option>
                    </select>
                </div>
                <div className="financing-option">
                    <label>Тип клієнта</label>
                    <select>
                        <option>Юридична особа</option>
                        <option>Фізична особа</option>
                    </select>
                </div>
                <div className="financing-option">
                    <label>Тип погашення</label>
                    <select>
                        <option>Класичний</option>
                        <option>Ануїтет</option>
                    </select>
                </div>
            </div>
            <button className="proposition-button">Дивитись пропозиції від банків</button>
        </div>
    );
};

export default BankFinancing;
