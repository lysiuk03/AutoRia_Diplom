import React, { useState } from "react";
import './CarSearchForm.css';

const CarSearchForm: React.FC = () => {
    const [searchType, setSearchType] = useState<string>('Всі');
    const [carType, setCarType] = useState<string>('Легкові');
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [vinChecked, setVinChecked] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            searchType,
            carType,
            make,
            model,
            region,
            year,
            price,
            vinChecked
        });
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h2>ЗНАЙДІТЬ СВІЙ АВТОМОБІЛЬ ТУТ</h2>
            <div className="search-form-container">
                <div className="car-search-options">
                    <div className="button-group">
                        {['Всі', 'Вживані', 'Нові', 'Під пригон'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={`radio-button ${searchType === type ? 'active' : ''}`}
                                onClick={() => setSearchType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="vin-check">
                        <div className="vin-check-label">
                            <label>Перевірений VIN</label>
                        </div>
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                checked={vinChecked}
                                onChange={() => setVinChecked(!vinChecked)}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="car-search-form-fields">
                    <div>
                        <select value={carType} onChange={(e) => setCarType(e.target.value)}>
                            <option value="Легкові">Легкові</option>
                        </select>
                        <select value={make} onChange={(e) => setMake(e.target.value)}>
                            <option value="">Марка</option>
                        </select>
                        <select value={model} onChange={(e) => setModel(e.target.value)}>
                            <option value="">Модель</option>
                        </select>
                    </div>
                    <div>
                        <select value={region} onChange={(e) => setRegion(e.target.value)}>
                            <option value="">Регіон</option>
                        </select>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Рік випуску</option>
                        </select>
                        <select value={price} onChange={(e) => setPrice(e.target.value)}>
                            <option value="">Ціна, $</option>
                        </select>
                    </div>
                </div>
                <div className="car-search-btn">
                    <button className="extended-search-btn" type="button">Розширений пошук</button>
                    <button className="search-btn" type="submit">Шукати</button>
                </div>
            </div>
        </form>
    );
};

export default CarSearchForm;
