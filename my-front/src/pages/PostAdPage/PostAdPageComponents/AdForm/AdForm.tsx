import React, { useEffect, useState } from 'react';
import './AdForm.css';
import axios from 'axios';

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



const AdForm: React.FC = () => {
    const [optionsData, setOptionsData] = useState<OptionData>(defaultOptions);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const [selectedPaintType, setSelectedPaintType] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedAccidentStatus, setSelectedAccidentStatus] = useState<string>("");
    const [selectedTechnicalState, setSelectedTechnicalState] = useState<string>("");
    const [selectedAccessory, setSelectedAccessory] = useState<string>("");

    const [filteredModels, setFilteredModels] = useState<string[]>(['Оберіть']);
    const [filteredCities, setFilteredCities] = useState<string[]>(['Оберіть']);

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
            } catch (err) {
                setError('Не вдалося завантажити дані');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
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
    };

    const handleBodyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBodyType(e.target.value);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionName = e.target.value;
        setSelectedRegion(regionName);

        const selectedRegion = optionsData.regions.find(region => region.name === regionName);
        setFilteredCities(selectedRegion ? selectedRegion.cities.map(city => city.name) : ['Оберіть']);
    };

    // Add other change handlers for the remaining selects...

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
                    <img src="/images/info.png" alt="Info" />
                    <a>Як правильно сфотографувати авто ?</a>
                </div>
            </section>
            <section>
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
                    {renderSelect("Марка", optionsData.brands[1] ? optionsData.brands.map(b => b.name) : ['Оберіть'], selectedBrand, handleBrandChange)}
                    {/* Render model select based on filteredModels */}
                    {renderSelect("Модель авто", filteredModels, selectedModel, handleModelChange)}
                    {renderSelect("Пробіг", optionsData.mileages, selectedMileage, (e) => setSelectedMileage(e.target.value))}
                    {renderSelect("Регіон", ["Оберіть", ...optionsData.regions.map(region => region.name)], selectedRegion, handleRegionChange)}
                    {renderSelect("Місто", filteredCities, selectedCity, (e) => setSelectedCity(e.target.value))}
                    {renderSelect("Рік випуску", optionsData.years, selectedYear, (e) => setSelectedYear(e.target.value))}


                </div>

                <div className="vin-container">
                    <div>
                        <label>VIN-код</label>
                        <input type="text" name="vin" className="vin-input" placeholder="VIN-код" />
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
                    {renderSelect("Лакофарбоване покриття", optionsData.paintTypes, selectedPaintType, (e) => setSelectedPaintType(e.target.value))}
                    {renderSelect("Колір", optionsData.colors, selectedColor, (e) => setSelectedColor(e.target.value))}
                    {renderSelect("Участь в ДТП", optionsData.accidentStatuses, selectedAccidentStatus, (e) => setSelectedAccidentStatus(e.target.value))}
                    {renderSelect("Технічний стан", optionsData.technicalStates, selectedTechnicalState, (e) => setSelectedTechnicalState(e.target.value))}
                    {renderSelect("Додаткові аксесуари", optionsData.accessories, selectedAccessory, (e) => setSelectedAccessory(e.target.value))}
                </div>
            </section>
        </form>
    );
};

export default AdForm;
