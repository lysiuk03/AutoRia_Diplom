// Libraries
import React from 'react';
import './AdForm.css';
const AdForm: React.FC = () => {

    return (
        <form className="ad-form-container">
            <h2>Додавання оголошення</h2>
            <section>
                <div className="add-img-auto">
                    <div className="row">
                        <div className="circle-number">1</div>
                        <div className="column">
                            <h3>Додайте 3 фото авто з відкритим держ. номером</h3>
                            <p>WheelDeal автоматично підтягне інформацію про автомобіль</p>
                        </div>
                    </div>
                    <div className="row">
                        <button className="add-img-btn">+</button>
                        <label className="add-img-label"> Додати фото</label>
                    </div>
                </div>
                <div className="info-box">
                    <img src="/images/info.png" alt="Info"/>
                    <a>Як правильно сфотографувати авто ?</a>
                </div>
            </section>
            <section>
                <div className="row">
                    <div className="circle-number">2</div>
                    <h3>Основна інформація</h3>
                </div>
                <div className="grid-container">
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="dropdown-container">
                        <label>Оберіть</label>
                        <select>
                            <option value="">Оберіть</option>
                            {/* Add options here */}
                        </select>
                    </div>
                </div>
            </section>

        </form>
    );
};

export default AdForm;
