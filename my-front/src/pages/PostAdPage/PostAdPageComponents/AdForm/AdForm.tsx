// Libraries
import React from 'react';
import './AdForm.css';

const optionsData = {
    transportTypes: ["Оберіть", "Легковий", "Вантажний", "Мотоцикл"],
    modifications: ["Оберіть", "Базова", "Комфорт", "Спортивна"],
    countries: ["Оберіть", "Україна", "США", "Німеччина"],
    bodyTypes: ["Оберіть", "Седан", "Хетчбек", "Кросовер"],
    brands: ["Оберіть", "Toyota", "BMW", "Audi"],
    mileages: ["Оберіть", "0-50,000 км", "50,000-100,000 км", "100,000+ км"],
    models: ["Оберіть", "Corolla", "X5", "Q7"],
    regions: ["Оберіть", "Київ", "Львів", "Одеса"],
    years: ["Оберіть", "2024", "2023", "2022"],
    cities: ["Оберіть", "Київ", "Львів", "Одеса"],
    paintTypes: ["Оберіть", "Металіз", "Перламутр", "Мат"],
    colors: ["Оберіть", "Червоний", "Синій", "Чорний"],
    accidentStatuses: ["Оберіть", "Не був в ДТП", "Був в ДТП"],
    technicalStates: ["Оберіть", "Відмінний", "Добрий", "Задовільний"],
    accessories: ["Оберіть", "Є", "Немає"],
};

const AdForm: React.FC = () => {
    const renderSelect = (label: string, options: string[]) => (
        <div className="dropdown-container">
            <label>{label}</label>
            <select>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    return (
        <form className="ad-form-container">
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
                <div className="ad-row">
                    <div className="circle-number">2</div>
                    <h3>Основна інформація</h3>
                </div>
                <div className="ad-grid-container grid-retreat">
                    {renderSelect("Тип транспорту", optionsData.transportTypes)}
                    {renderSelect("Модифікація", optionsData.modifications)}
                    {renderSelect("Країна виробник", optionsData.countries)}
                    {renderSelect("Тип кузова", optionsData.bodyTypes)}
                    {renderSelect("Марка", optionsData.brands)}
                    {renderSelect("Пробіг", optionsData.mileages)}
                    {renderSelect("Модель авто", optionsData.models)}
                    {renderSelect("Регіон", optionsData.regions)}
                    {renderSelect("Рік випуску", optionsData.years)}
                    {renderSelect("Місто", optionsData.cities)}
                </div>

                <div className="vin-container">
                    <div>
                        <label>VIN-код</label>
                        <input type="text" name="vin" className="vin-input" placeholder="VIN-код"/>
                    </div>
                    <small className="vin-small">*авто з перевіреним VIN-кодом продаються швидше</small>
                </div>
                <div className="info-box">
                    <img src="/images/info.png" alt="Info"/>
                    <a>Де знайти VIN-код ?</a>
                </div>
            </section>
            <section>
                <div className="ad-row">
                    <div className="circle-number">3</div>
                    <h3>Опис авто</h3>
                </div>
                <div className="ad-row">
                    <div className="ad-column description-container">
                        <textarea className="description-input" placeholder="Опис українською"></textarea>
                        <span className="char-limit">Доступно 2000 символів</span>
                    </div>
                    <div className="ad-column description">
                        <small>В даному полі забороняється:</small>
                        <small><span>!</span>Залишати посилання або контактні дані</small>
                        <small><span>!</span>Пропонувати послуги (прижену під замовлення, є інші авто, допоможу вибрати)</small>
                    </div>
                </div>
            </section>
            <section>
                <div className="ad-row">
                    <div className="circle-number">4</div>
                    <h3>Характерисика</h3>
                </div>
                <div className="ad-column characteristic-container">
                    {renderSelect("Лакофарбоване покриття", optionsData.paintTypes)}
                    {renderSelect("Колір", optionsData.colors)}
                    {renderSelect("Участь в ДТП", optionsData.accidentStatuses)}
                    {renderSelect("Технічний стан", optionsData.technicalStates)}
                </div>
            </section>
            <section>
                <div className="ad-row">
                    <div className="circle-number">5</div>
                    <h3>Додатки</h3>
                </div>
                <div className="ad-grid-container grid-retreat">
                    {renderSelect("Електроскло- підйомники", optionsData.accessories)}
                    {renderSelect("Регулювання сидінь салону по висоті", optionsData.accessories)}
                    {renderSelect("Кондиціонер", optionsData.accessories)}
                    {renderSelect("Фари", optionsData.accessories)}
                    {renderSelect("Матеріали салону", optionsData.accessories)}
                    {renderSelect("Запасне колесо", optionsData.accessories)}
                    {renderSelect("Колір салону", optionsData.accessories)}
                    {renderSelect("Пам'ять положення сидіння", optionsData.accessories)}
                    {renderSelect("Підсилювач керма", optionsData.accessories)}
                    {renderSelect("Підігрів сидінь", optionsData.accessories)}
                    {renderSelect("Вентиляція сидінь", optionsData.accessories)}
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
                    <input type="text" placeholder="Ціна" className="price-inp"/>
                    <select className="price-select">
                        <option value="$" >USD</option>
                    </select>
                </div>
                <div className="options">
                    <label><input type="checkbox" /> Нерозмитнений</label>
                    <label><input type="checkbox" /> Можливий торг</label>
                    <label><input type="checkbox" /> Можливий обмін на авто</label>
                    <label><input type="checkbox" /> Оплата частинами</label>
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
                <button className="ad-btn">Розмістити оголошення</button>
            </section>


        </form>
    );
};

export default AdForm;