// Libraries
import React, {useEffect, useState} from "react";

// Styles
import './CarSearchForm.css';
import axios from "axios";





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
    bodyTypes: ["Оберіть"],
    transportTypes: ["Оберіть"],
    countries: ["Оберіть", "Україна", "США", "Німеччина"],
    brands: [],
    models: [],

    regions: [],
    years: [],

};

const CarSearchForm: React.FC = () => {
    if(defaultOptions.years[1] == undefined)
    {
        for (let year = 2024; year >= 1991; year--) {
            defaultOptions.years.push(year.toString());
        }
        defaultOptions.years.push("Раніше");
    }


    const [searchType, setSearchType] = useState<string>('Всі');
    const [carType, setCarType] = useState<string>('Легкові');
    //const [make, setMake] = useState<string>('');
    //const [model, setModel] = useState<string>('');
    const [region, setRegion] = useState<string>('Оберіть');
    const [year, setYear] = useState<string>('Оберіть');
    const [price, setPrice] = useState<string>('Оберіть');
    const [vinChecked, setVinChecked] = useState<boolean>(false);

    const [optionsData, setOptionsData] = useState<OptionData>(defaultOptions);
    const [filteredModels, setFilteredModels] = useState<string[]>(['Оберіть']);
    const [selectedModel, setSelectedModel] = useState<string>("Оберіть");
    const [selectedBrand, setSelectedBrand] = useState<string>('Оберіть');

    useEffect(() => {
        const fetchData = async () => {
            //setIsLoading(true);
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
                    bodyTypes: [...bodyTypesResponse.data.map((bt: { name: string }) => bt.name)],
                    fuelTypes: [...fuelTypesResponse.data.map((ft: { name: string }) => ft.name)],
                    engineVolumes: [...engineVolumesResponse.data.map((ev: { volume: string }) => String(ev.volume))],
                    numberOfSeats: [...numberOfSeatsResponse.data.map((ns: { number: string }) => ns.number)],
                    transmissionTypes: [...transmissionTypesResponse.data.map((tt: { name: string }) => tt.name)],
                    brands: brandsAndModelsResponse.data.map((brand: { id: number; name: string; models: { name: string }[] }) => ({
                        id: brand.id,
                        name: brand.name,
                        models: brand.models.map((model: { name: string }) => model)
                    })),
                    //models: [brandsAndModelsResponse.data.models.map((model: { name: string }) => model)],
                    transportTypes : [...transportTypesResponse.data.map((bt: { name: string }) => bt.name)],
                    regions: regionsResponse.data
                }));

            } catch (err) {
                //setError('Не вдалося завантажити дані');
            } finally {
                //setIsLoading(false);
            }
        };


        fetchData();
    }, []);

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandName = e.target.value;
        setSelectedBrand(brandName);
        const selectedBrand = optionsData.brands.find(b => b.name === brandName);
        setFilteredModels(selectedBrand ? selectedBrand.models.map((model) => model.name) : []);
        setSelectedModel(e.target); // Reset model on brand change
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            searchType,
            carType,
            selectedBrand,
            selectedModel,
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
                            {optionsData.transportTypes.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {renderSelect(optionsData.brands[1] ? optionsData.brands.map(b => b.name) : ['Оберіть'], selectedBrand, handleBrandChange)}
                        {renderSelect(filteredModels, selectedModel, handleModelChange)}
                    </div>
                    <div>
                        <select value={region} onChange={(e) => setRegion(e.target.value)}>
                            {optionsData.regions[1] ? optionsData.regions.map(option => (
                                <option key={option.id} value={option.name}>{option.name}</option>
                            )) : <option key={0} value={"Оберіть"}>Оберіть</option>

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