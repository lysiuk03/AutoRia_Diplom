// Libraries
import React, {useEffect, useState} from "react";

// Styles
import './CarSearchForm.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Car} from "../../../../../interfaces/Car";





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
    transportTypes: string[];
    countries: string[];
    regions: Region[];
    years: string[];
}

const defaultOptions: OptionData = {
    bodyTypes: [],
    transportTypes: [],
    countries: [],
    brands: [],
    models: [],
    regions: [],
    years: [],

};

const CarSearchForm: React.FC = () => {
    const navigate = useNavigate();
    if(defaultOptions.years[0] == undefined)
    {
        defaultOptions.years.push("Будь-який")
        for (let year = 2024; year >= 1991; year--) {
            defaultOptions.years.push(year.toString());
        }
        defaultOptions.years.push("Раніше");
    }


    const [searchType, setSearchType] = useState<string>("Будь-який");
    const [carType, setCarType] = useState<string>("Будь-який");
    //const [make, setMake] = useState<string>('');
    //const [model, setModel] = useState<string>('');
    const [region, setRegion] = useState<string>("Будь-який");
    const [year, setYear] = useState<string>("Будь-який");
    const [price, setPrice] = useState<string>("Будь-який");
    const [vinChecked, setVinChecked] = useState<boolean>(false);

    const [optionsData, setOptionsData] = useState<OptionData>(defaultOptions);
    const [filteredModels, setFilteredModels] = useState<string[]>(["Будь-який"]);
    const [selectedModel, setSelectedModel] = useState<string>("Будь-який");
    const [selectedBrand, setSelectedBrand] = useState<string>("Будь-який");

    useEffect(() => {
        const fetchData = async () => {
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

                const updatedBrands = [
                    { id: 0, name: "Будь-який", models: [{ name: "Будь-який" }] },
                    ...brandsAndModelsResponse.data.map((brand: { id: number; name: string; models: { name: string }[] }) => ({
                        id: brand.id,
                        name: brand.name,
                        models: [{ name: "Будь-який" }, ...brand.models]
                    }))
                ];

                const updatedRegions = [
                    { id: 0, name: "Будь-який", cities: [{ id: 0, name: "Будь-який" }] },
                    ...regionsResponse.data.map((region: { id: number; name: string; cities: { id: number; name: string }[] }) => ({
                        id: region.id,
                        name: region.name,
                        cities: [{ id: 0, name: "Будь-який" }, ...region.cities]
                    }))
                ];

                setOptionsData(prev => ({
                    ...prev,
                    bodyTypes: ["Будь-який", ...bodyTypesResponse.data.map((bt: { name: string }) => bt.name)],
                    fuelTypes: ["Будь-який", ...fuelTypesResponse.data.map((ft: { name: string }) => ft.name)],
                    engineVolumes: ["Будь-який", ...engineVolumesResponse.data.map((ev: { volume: string }) => String(ev.volume))],
                    numberOfSeats: ["Будь-який", ...numberOfSeatsResponse.data.map((ns: { number: string }) => ns.number)],
                    transmissionTypes: ["Будь-який", ...transmissionTypesResponse.data.map((tt: { name: string }) => tt.name)],
                    brands: updatedBrands,
                    transportTypes: ["Будь-який", ...transportTypesResponse.data.map((tt: { name: string }) => tt.name)],
                    regions: updatedRegions
                }));

                setFilteredModels(updatedBrands[0].models.map((model: { name: string }) => model.name));
            } catch (err) {
                console.error('Не вдалося завантажити дані');
            }
        };

        fetchData();
    }, []);


    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandName = e.target.value;
        setSelectedBrand(brandName);
        const selectedBrand = optionsData.brands.find(b => b.name === brandName);

        // Оновлюємо список моделей для вибраного бренду
        const models = selectedBrand ? selectedBrand.models.map((model) => model.name) : [];
        setFilteredModels(models);

        // Встановлюємо першу модель зі списку або "Всі", якщо список порожній
        setSelectedModel(models[0]);
    };
    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
    };
    const renderSelect = (
        options: string[],
        value: string,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    ) => (
        <div>
            <select value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const searchRequest = {
            searchType,
            carType,
            selectedBrand,
            selectedModel,
            region,
            year,
            price,
            vinChecked
        };

        console.log(searchRequest); // Перевірка об'єкта запиту

        try {
            const response = await axios.post<Car[]>('http://localhost:5174/api/Car/search', searchRequest);
            console.log(response.data); // Обробка отриманих даних
            navigate("/search", { state: { cars: response.data, text: searchRequest } });
        } catch (error) {
            console.error('Error during axios request:', error);
        }
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
                            {optionsData.transportTypes.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {renderSelect(optionsData.brands.map(b => b.name), selectedBrand, handleBrandChange)}
                        {renderSelect(filteredModels, selectedModel, handleModelChange)}
                    </div>
                    <div>
                        <select value={region} onChange={(e) => setRegion(e.target.value)}>
                            {optionsData.regions.map(option => (
                                <option key={option.id} value={option.name}>{option.name}</option>
                            ))

                            }
                        </select>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            {optionsData.years.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <select value={price} onChange={(e) => setPrice(e.target.value)}>
                            <option value="">Ціна, $</option>
                        </select>
                    </div>
                </div>
                <div className="car-search-btn">
                    <button className="extended-search-btn" type="button">Розширений пошук</button>
                    <button className="search-btn none-line" type="submit">Шукати</button>
                </div>
            </div>
        </form>
    );
};

export default CarSearchForm;
