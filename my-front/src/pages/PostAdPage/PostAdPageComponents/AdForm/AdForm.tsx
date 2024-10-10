import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdForm.css';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store.ts";
import {decodeJwt} from "jose";

interface DecodedToken {
    firstName?: string;
    lastName?: string;
    id?: string;
    location?: string;
    rating?: number;
    photo?: string;
}

// Оновлений інтерфейс для ProfileCardProps
interface ProfileCardProps {
    name: string;
    id: string; // Змінено на string для id
    imageUrl: string[];
}

interface CarModel {
    id: number;
    name: string;
}

interface CarBrand {
    id: number;
    name: string;
    models: CarModel[];
}

interface City {
    id: number;
    name: string;
}

interface Region {
    id: number;
    name: string;
    cities: City[];
}

interface OptionData {
    brands: CarBrand[];
    models: CarModel[];
    bodyTypes: string[];
    fuelTypes: string[];
    engineVolumes: string[];
    numberOfSeats: string[];
    transmissionTypes: string[];
    transportTypes: string[];
    modifications: string[];
    countries: string[];
    mileages: string[];
    regions: Region[];
    years: string[];
    cities: string[];
    paintTypes: string[];
    colors: string[];
    accidentStatuses: string[];
    technicalStates: string[];
    accessories: string[];
}

const defaultOptions: OptionData = {
    bodyTypes: ['Оберіть'],
    fuelTypes: ['Оберіть'],
    engineVolumes: ['Оберіть'],
    numberOfSeats: ['Оберіть'],
    transmissionTypes: ['Оберіть'],
    transportTypes: ["Оберіть", "Легковий", "Вантажний", "Мотоцикл"],
    modifications: ["Оберіть", "Базова", "Комфорт", "Спортивна"],
    countries: ["Оберіть", "Україна", "США", "Німеччина"],
    brands: [],
    models: [],
    mileages: ["Оберіть", "0-50,000 км", "50,000-100,000 км", "100,000+ км"],
    regions: [],
    years: ["Оберіть", "2024", "2023", "2022"],
    cities: ["Оберіть"],
    paintTypes: ["Оберіть", "Металіз", "Перламутр", "Мат"],
    colors: ["Оберіть", "Червоний", "Синій", "Чорний"],
    accidentStatuses: ["Оберіть", "Не був в ДТП", "Був в ДТП"],
    technicalStates: ["Оберіть", "Відмінний", "Добрий", "Задовільний"],
    accessories: ["Оберіть", "Є", "Немає"]
};

const CarCreateForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        userid : "",
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
        carBrand: "",
        transportType: "",
        carModel: "",
        bodyType: "",
        transmissionType: "",
        numberOfSeats: "",
        fuelTypes: "",
        engineVolume: "",
        city: "",
        color: "",
        photos: []
    });

    const [optionsData, setOptionsData] = useState<OptionData>(defaultOptions);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);
    // State variables for selected options
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("Оберіть");
    const [selectedCity, setSelectedCity] = useState<string>("");


    const [selectedBodyType, setSelectedBodyType] = useState<string>("");
    const [selectedFuelType, setSelectedFuelType] = useState<string>("");
    const [selectedEngineVolume, setSelectedEngineVolume] = useState<string>("");
    const [selectedNumberOfSeats, setSelectedNumberOfSeats] = useState<string>("");
    const [selectedTransmissionType, setSelectedTransmissionType] = useState<string>("");
    const [selectedTransportType, setSelectedTransportType] = useState<string>("");
    const [selectedModification, setSelectedModification] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedMileage, setSelectedMileage] = useState<string>("");

    const [selectedYear, setSelectedYear] = useState<string>("");


     const [selectedColor, setSelectedColor] = useState<string>("");


    const [filteredModels, setFilteredModels] = useState<string[]>(['Оберіть']);
    const [filteredCities, setFilteredCities] = useState<string[]>(['Оберіть']);



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

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form = new FormData();
        //formData.photos = fileList.map(file => file);

        for (const key in formData) {
            if (key === 'photos') {
                formData.photos.forEach((file) => {
                    form.append('photos', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        }
        formData.userid = profileData.id;
        formData.carBrand = selectedBrand;
        formData.carModel = selectedModel;
        formData.city = selectedCity;
        formData.engineVolume = selectedEngineVolume;
        formData.bodyType = selectedBodyType;
        formData.fuelTypes = selectedFuelType;
        formData.transmissionType = selectedTransmissionType;
        formData.numberOfSeats = selectedNumberOfSeats;
        formData.fuelTypes = selectedFuelType;
        formData.transportType = selectedTransportType;
        formData.color = selectedColor;
        formData.stage = selectedModification;

        try {
            const response = await axios.post('http://localhost:5174/api/Car/add', form);
            console.log(form);
            console.log(response.status);
            // Можна додати логіку для скидання форми або переходу на іншу сторінку
        } catch (error) {
            // Обробка помилок
            console.error('Error adding car:', error.response?.data || error.message);
            alert('Помилка при додаванні автомобіля: ' + (error.response?.data || error.message));
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [
                    bodyTypesResponse,
                    fuelTypesResponse,
                    engineVolumesResponse,
                    numberOfSeatsResponse,
                    transmissionTypesResponse,
                    brandsAndModelsResponse,
                    transportTypesResponse,
                    regionsResponse
                ] = await Promise.all([
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/bodytypes'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/fueltypes'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/enginevolumes'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/numberofseats'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/transmissiontypes'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/brandsandmodels'),
                    axios.get('http://localhost:5174/api/TechnicalSpecifications/transporttypes'),
                    axios.get('http://localhost:5174/api/RegionalAndPricing')
                ]);

                setOptionsData(prev => ({
                    ...prev,
                    bodyTypes: ['Оберіть', ...bodyTypesResponse.data.map((bt: { name: string }) => bt.name)],
                    fuelTypes: ['Оберіть', ...fuelTypesResponse.data.map((ft: { name: string }) => ft.name)],
                    engineVolumes: ['Оберіть', ...engineVolumesResponse.data.map((ev: { volume: string }) => String(ev.volume))],
                    numberOfSeats: ['Оберіть', ...numberOfSeatsResponse.data.map((ns: { number: string }) => ns.number)],
                    transmissionTypes: ['Оберіть', ...transmissionTypesResponse.data.map((tt: { name: string }) => tt.name)],
                    brands: brandsAndModelsResponse.data.map((brand: { id: number; name: string; models: { name: string }[] }) => ({
                        id: brand.id,
                        name: brand.name,
                        models: brand.models.map((model: { name: string }) => model)
                    })),
                    transportTypes : ['Оберіть', ...transportTypesResponse.data.map((bt: { name: string }) => bt.name)],
                    regions: regionsResponse.data
                }));

                // Встановлення першого бренду та його першої моделі
                if (optionsData.brands.length > 0) {
                    const firstBrand = optionsData.brands[0];
                    setSelectedBrand(firstBrand.name);
                    if (firstBrand.models.length > 0) {
                        setSelectedModel(firstBrand.models[0].name);
                        setFilteredModels(firstBrand.models.map(model => model.name));
                    }
                }
            } catch (err) {
                return <div>Не вдалося завантажити дані</div>
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }


    const renderSelect = (
        label: string,
        options: string[],
        value: string,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    ) => (
        <div className="dropdown-container">
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandName = e.target.value;
        setSelectedBrand(brandName);
        const selectedBrand = optionsData.brands.find(b => b.name === brandName);
        setFilteredModels(selectedBrand ? selectedBrand.models.map((model) => model.name) : []);
        setSelectedModel(""); // Reset model on brand change

    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
        setFilteredModels([...e.target.value]);
    };


    const handleBodyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBodyType(e.target.value);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionName = e.target.value;
        setSelectedRegion(regionName);

        const selectedRegion = optionsData.regions.find(region => region.name === regionName);
        setFilteredCities(selectedRegion ? selectedRegion.cities.map(city => city.name) : ['Оберіть']);
        selectedRegion ? setSelectedCity(selectedRegion?.cities[0].name) : setSelectedCity("Невідоме місто");
    };
    const handleCityChange = (e: string) => {
      const cityName = e;
      setSelectedCity(cityName);
    };

    // Add other change handlers for the remaining selects...

    // function handleOnSubmit() {
    //     console.log("Submit");
    // }


    // Отримуємо токен з Redux

    // Декодуємо токен
    let profileData: ProfileCardProps = {
        name: 'Невідомий користувач',
        id: '0',
        imageUrl: ['/images/default.png'],
    };

    if (token) {
        const decodedToken = decodeJwt(token) as DecodedToken; // Вказуємо тип для decodedToken

        // Використовуємо властивості з декодованого токена
        profileData = {
            name: decodedToken?.firstName ? `${decodedToken.firstName} ${decodedToken.lastName}` : 'Невідомий користувач',
            id: decodedToken?.id || '0', // Використання id як рядка
            imageUrl: decodedToken?.photo ? [decodedToken.photo] : ['/images/default.png'],
        };
        //console.log(profileData);
    }

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
                        <input type="file" name="photos" multiple onChange={handleFileChange} id="upload" hidden/>
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
                    {renderSelect("Тип кузова", optionsData.bodyTypes, selectedBodyType, handleBodyTypeChange)}
                    {renderSelect("Тип палива", optionsData.fuelTypes, selectedFuelType, (e) => setSelectedFuelType(e.target.value))}
                    {renderSelect("Об'єм двигуна", optionsData.engineVolumes, selectedEngineVolume, (e) => setSelectedEngineVolume(e.target.value))}
                    {renderSelect("Кількість місць", optionsData.numberOfSeats, selectedNumberOfSeats, (e) => setSelectedNumberOfSeats(e.target.value))}
                    {renderSelect("Тип трансмісії", optionsData.transmissionTypes, selectedTransmissionType, (e) => setSelectedTransmissionType(e.target.value))}
                    {renderSelect("Тип транспорту", optionsData.transportTypes, selectedTransportType, (e) => setSelectedTransportType(e.target.value))}
                    {renderSelect("Модифікація", optionsData.modifications, selectedModification, (e) => setSelectedModification(e.target.value))}
                    {renderSelect("Країна виробник", optionsData.countries, selectedCountry, (e) => setSelectedCountry(e.target.value))}
                    {/* Render brand select */}
                    {renderSelect("Марка", optionsData.brands[1] ? optionsData.brands.map(b => b.name) : ['Оберіть'], selectedBrand, (e) =>handleBrandChange(e))}
                    {/* Render model select based on filteredModels */}
                    {renderSelect("Модель авто", filteredModels, selectedModel, (e) => handleModelChange(e))}
                    {renderSelect("Пробіг", optionsData.mileages, selectedMileage, (e) => setSelectedMileage(e.target.value))}
                    {renderSelect("Регіон", ["Оберіть", ...optionsData.regions.map(region => region.name)], selectedRegion, handleRegionChange)}
                    {renderSelect("Місто", filteredCities, selectedCity, (e) => handleCityChange(e.target.value))}
                    {renderSelect("Рік випуску", optionsData.years, selectedYear, (e) => setSelectedYear(e.target.value))}


                </div>

                <div className="vin-container">
                    <div>
                        <label>VIN-код</label>
                        <input className="vin-input" placeholder="VIN-код" type="text" name="vin" value={formData.vin}
                               onChange={handleChange} required/>
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
                        <label>Колір </label>
                    {renderSelect("Колір", optionsData.colors, selectedColor, (e) => setSelectedColor(e.target.value))}
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