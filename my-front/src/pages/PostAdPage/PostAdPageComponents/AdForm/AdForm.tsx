import React, { useState } from 'react';
import axios from 'axios';
import './AdForm.css';

const CarCreateForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        stage: '',
        mileage: 0,
        vin: '',
        year: new Date().getFullYear(),
        price: 0,
        metallic: false,
        accidentParticipation: false,
        hasPowerWindows: false,
        hasAirConditioning: false,
        hasLeatherInterior: false,
        hasPremiumInteriorColor: false,
        hasPowerSteering: false,
        hasHeightAdjustableSeats: false,
        hasHeadlights: false,
        hasSpareWheel: false,
        hasSeatMemory: false,
        hasHeatedSeats: false,
        hasSeatVentilation: false,
        isNotCustomsCleared: false,
        isBargainAvailable: false,
        isExchangeAvailable: false,
        isInstallmentAvailable: false,
        carBrandId: null,
        transportTypeId: null,
        carModelId: null,
        bodyTypeId: null,
        transmissionTypeId: null,
        numberOfSeatsId: null,
        fuelTypesId: null,
        engineVolumeId: null,
        cityId: null,
        colorId: null,
        photos: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photos: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        for (const key in formData) {
            if (key === 'photos') {
                formData.photos.forEach((file) => {
                    form.append('photos', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:5174/api/Car', form);
            console.log(form);
            console.log(response.status);
            // Можна додати логіку для скидання форми або переходу на іншу сторінку
        } catch (error) {
            // Обробка помилок
            console.error('Error adding car:', error.response?.data || error.message);
            alert('Помилка при додаванні автомобіля: ' + (error.response?.data || error.message));
        }
    };

    return (
        <form className="ad-form-container" onSubmit={handleSubmit}>
            <h2>Додавання оголошення</h2>
            <section>
                <div className="add-img-auto">
                    <div className="ad-row">
                        <div className="circle-number">1</div>
                        <div className="ad-column">
                            <h3>Додайте 3 фото авто з відкритим держ. номером</h3>
                            <p>WheelDeal автоматично підтягне інформацію про автомобіль</p>
                        </div>
                    </div>
                    <div className="ad-row">
                        <input type="file" name="photos" multiple onChange={handleFileChange} id="upload" hidden />
                        <label htmlFor="upload" className="upload-button">+</label>
                        <label htmlFor="upload" className="add-img-label"> Додати фото</label>
                    </div>
                </div>
                <div className="info-box">
                    <img src="/images/info.png" alt="Info" />
                    <a>Як правильно сфотографувати авто ?</a>
                </div>
            </section>
            <section className="num-2">
                <div className="ad-row">
                    <div className="circle-number">2</div>
                    <h3>Основна інформація</h3>
                </div>
                <div className="ad-grid-container grid-retreat">
                    <div className="dropdown-container">
                        <label>Тип транспорту (id)</label>
                        <input type="number" name="transportTypeId" value={formData.transportTypeId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Місто (id)</label>
                        <input type="number" name="cityId" value={formData.cityId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Марка (id)</label>
                        <input type="number" name="carBrandId" value={formData.carBrandId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Тип палива (id)</label>
                        <input type="number" name="fuelTypesId" value={formData.fuelTypesId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Модель авто (id)</label>
                        <input type="number" name="carModelId" value={formData.carModelId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label> Коробка передач (id)</label>
                        <input type="number" name="transmissionTypeId" value={formData.transmissionTypeId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Обсяг двигуна (id)</label>
                        <input type="number" name="engineVolumeId" value={formData.engineVolumeId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Пробіг</label>
                        <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
                    </div>
                    <div className="dropdown-container">
                        <label>Рік випуску</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                    </div>
                    <div className="dropdown-container">
                        <label>Кількість сидінь</label>
                        <input type="number" name="numberOfSeatsId" value={formData.numberOfSeatsId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Тип кузова (id)</label>
                        <input type="number" name="bodyTypeId" value={formData.bodyTypeId || ''} onChange={handleChange} />
                    </div>
                    <div className="dropdown-container">
                        <label>Тех. характеристики:</label>
                        <input type="text" name="stage" value={formData.stage} onChange={handleChange} required />
                    </div>

                </div>
                <div className="vin-container">
                    <div>
                        <label>VIN-код</label>
                        <input  className="vin-input"  placeholder="VIN-код" type="text" name="vin" value={formData.vin} onChange={handleChange} required />
                    </div>
                    <small className="vin-small">*авто з перевіреним VIN-кодом продаються швидше</small>
                </div>
                <div className="info-box">
                    <img src="/images/info.png" alt="Info" />
                    <a>Де знайти VIN-код ?</a>
                </div>
            </section>
            <section>
                <div className="ad-row">
                    <div className="circle-number">3</div>
                    <h3>Опис авто</h3>
                </div>
                <div className="ad-row desc-container">
                    <div className="ad-column ">
                        <textarea
                            className="description-input"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Опис українською"
                            required
                        />
                        <span className="char-limit">Доступно 2000 символів</span>
                    </div>
                    <div className="ad-column description">
                        <small>В даному полі забороняється:</small>
                        <small><span>!</span>Залишати посилання або контактні дані</small>
                        <small><span>!</span>Пропонувати послуги (прижену під замовлення, є інші авто, допоможу вибрати)</small>
                    </div>
                </div>
            </section>
            <section className="num-4">
                <div className="ad-row">
                    <div className="circle-number">4</div>
                    <h3>Характерисика</h3>
                </div>
                <div className="ad-column characteristic-container">
                    <div className="dropdown-container">
                        <label>Колір (id)</label>
                        <input type="number" name="colorId" value={formData.colorId || ''} onChange={handleChange} />
                    </div>
                    <div className="options options-retreat">
                        <label><input type="checkbox" name="hasPremiumInteriorColor" checked={formData.hasPremiumInteriorColor} onChange={handleChange} />Лакофарбоване покриття</label>
                        <label><input type="checkbox" name="accidentParticipation" checked={formData.accidentParticipation} onChange={handleChange} />Участь в ДТП</label>
                    </div>
                </div>
            </section>
            <section className="num-5">
                <div className="ad-row">
                    <div className="circle-number">5</div>
                    <h3>Додатки</h3>
                </div>
                <div className="options-grid-container options-retreat">
                    <label>
                        <input type="checkbox" name="hasPowerWindows" checked={formData.hasPowerWindows} onChange={handleChange} />
                        Електроскло- підйомники
                    </label>
                    <label>
                        <input type="checkbox" name="hasHeightAdjustableSeats" checked={formData.hasHeightAdjustableSeats} onChange={handleChange} />
                        Регулювання сидінь салону по висоті
                    </label>
                    <label>
                        <input type="checkbox" name="hasAirConditioning" checked={formData.hasAirConditioning} onChange={handleChange} />
                        Кондиціонер
                    </label>
                    <label>
                        <input type="checkbox" name="hasLeatherInterior" checked={formData.hasLeatherInterior} onChange={handleChange} />
                        Шкіряний салон
                    </label>
                    <label>
                        <input type="checkbox" name="hasSpareWheel" checked={formData.hasSpareWheel} onChange={handleChange} />
                        Запасне колесо
                    </label>
                    <label>
                        <input type="checkbox" name="hasSeatVentilation" checked={formData.hasSeatVentilation} onChange={handleChange} />
                        Вентиляція сидінь
                    </label>
                    <label>
                        <input type="checkbox" name="hasSeatMemory" checked={formData.hasSeatMemory} onChange={handleChange} />
                        Пам'ять положення сидіння
                    </label>
                    <label>
                        <input type="checkbox" name="hasPowerSteering" checked={formData.hasPowerSteering} onChange={handleChange} />
                        Підсилювач керма
                    </label>
                    <label>
                        <input type="checkbox" name="hasHeatedSeats" checked={formData.hasHeatedSeats} onChange={handleChange} />
                        Підігрів сидінь
                    </label>
                    <label>
                        <input type="checkbox" name="hasHeadlights" checked={formData.hasHeadlights} onChange={handleChange} />
                        Є фари
                    </label>
                </div>
            </section>
            <section>
                <div className="ad-row">
                    <div className="circle-number">6</div>
                    <div className="ad-column">
                        <h3>Вартість</h3>
                        <p>ціна, валюта, торг, обмін</p>
                    </div>
                </div>
                <div className="ad-row price-retreat">
                    <label>Ціна</label>
                    <input type="number" placeholder="Ціна" className="price-inp" name="price" value={formData.price} onChange={handleChange} required />
                    <label>$</label>
                </div>
                <div className="options">
                    <label>
                        <input type="checkbox" name="isNotCustomsCleared" checked={formData.isNotCustomsCleared} onChange={handleChange} /> Нерозмитнений</label>
                    <label> <input type="checkbox" name="isBargainAvailable" checked={formData.isBargainAvailable} onChange={handleChange} /> Можливий торг</label>
                    <label>
                        <input type="checkbox" name="isExchangeAvailable" checked={formData.isExchangeAvailable} onChange={handleChange} /> Можливий обмін на авто</label>
                    <label> <input type="checkbox" name="isInstallmentAvailable" checked={formData.isInstallmentAvailable} onChange={handleChange} /> Оплата частинами</label>
                </div>

                <div className="agreement-container">
                    <div  className="agreement">
                        <div>
                            <input type="checkbox" id="termsCheckbox" />
                            <label htmlFor="termsCheckbox">Я згоден(згодна) з умовами</label>
                            <a href="#"> Угода про надання послуг</a>
                        </div>
                        <div>
                            <label htmlFor="termsCheckbox">Ваші персональні дані будуть оброблені та захищені згідно з</label>
                            <a href="#"> Політикою приватності</a>
                        </div>
                    </div>
                </div>
                <button className="ad-btn" type="submit">Розмістити оголошення</button>
            </section>

        </form>
    );
};

export default CarCreateForm;