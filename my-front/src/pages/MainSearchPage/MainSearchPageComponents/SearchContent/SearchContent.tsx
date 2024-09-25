import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';

// Styles
import './SearchContent.css';

// Components
import SearchCarCard from "./SearchContetComponents/SearchCarCard.tsx";

// Data type for Car
import { Car } from "../../../../interfaces/Car";

const SearchContent: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>('manufacturer'); // Default sort by model
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5174/api/Car');
                setCars(response.data);
            } catch (err) {
                setError('Не вдалося завантажити дані');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(event.target.value);
    };

    // Функція сортування автомобілів
    const sortedCars = cars.sort((a, b) => {
        if (sortCriteria === 'model') {
            return a.carModel.name.localeCompare(b.carModel.name);
        } else if (sortCriteria === 'manufacturer') {
            return a.carBrand.name.localeCompare(b.carBrand.name);
        }
        return 0;
    });

     const startIndex = (currentPage - 1) * itemsPerPage;
     const currentCars = sortedCars.slice(startIndex, startIndex + itemsPerPage);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='search-container'>
            <div className="search-options-container">
                {/* Your existing filter and sort UI */}
            </div>
            <div className="sort-filtr-container">
                <div>
                    <select className="sort-filtr-button" value={sortCriteria} onChange={handleSortChange}>
                        <option value="model">Mоделлю</option>
                        <option value="manufacturer">Bиробник</option>
                    </select>
                    <button className="sort-filtr-button">Фільтр</button>
                </div>
                <h5>{cars.length} авто</h5>
            </div>
            <div className="car-cards-container">
                {currentCars.map((car) => (
                    <SearchCarCard key={car.vin} {...car} />
                ))}
            </div>
            <Pagination
                current={currentPage}
                total={cars.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                align="center"
                className="custom-pagination"
            />
        </div>
    );
};

export default SearchContent;
