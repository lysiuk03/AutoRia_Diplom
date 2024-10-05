import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import './SearchContent.css';

interface SearchRequest {
    searchType: string,
    carType: string,
    selectedBrand: string,
    selectedModel: string,
    region: string,
    year: string,
    price: string,
    vinChecked: string
}

// Components
import SearchCarCard from "./SearchContetComponents/SearchCarCard.tsx";

// Data type for Car
import { Car } from "../../../../interfaces/Car";
import { useLocation, useNavigate } from "react-router-dom";

const SearchContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialSearchRequest: Car[] = location.state?.cars || []; // Handle case where state might be undefined
    const initialSearchParams: SearchRequest = location.state?.text || {
        searchType: '',
        carType: '',
        selectedBrand: '',
        selectedModel: '',
        region: '',
        year: '',
        price: '',
        vinChecked: ''
    };

    // State for cars and search parameters
    const [searchParams, setSearchParams] = useState<SearchRequest>(initialSearchParams);
    const [cars, setCars] = useState<Car[]>(initialSearchRequest);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState<string>('manufacturer');
    const itemsPerPage = 4;

    // Update cars and searchParams from location state whenever component mounts or state changes
    useEffect(() => {
        if (Array.isArray(initialSearchRequest)) {
            setCars(initialSearchRequest);
        }
        if (initialSearchParams) {
            setSearchParams(initialSearchParams);
        }
    }, [initialSearchRequest, initialSearchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(event.target.value);
    };

    const sortedCars = [...cars].sort((a, b) => {
        if (sortCriteria === 'model') {
            return a.carModel.name.localeCompare(b.carModel.name);
        } else if (sortCriteria === 'manufacturer') {
            return a.carBrand.name.localeCompare(b.carBrand.name);
        }
        return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCars = sortedCars.slice(startIndex, startIndex + itemsPerPage);

    const removeTag = (key: keyof SearchRequest) => {
        const updatedParams = {
            ...searchParams,
            [key]: "" // Clear the value of the removed tag
        };
        setSearchParams(updatedParams);
        // Perform the new search and update the URL state
        performSearch(updatedParams);
    };

    const performSearch = (updatedParams: SearchRequest) => {
        // Update the search results and navigate with new state
        console.log('Performing search with updated parameters: ', updatedParams);
        // Example: navigate to update state with new cars and search parameters
        navigate("/search", { state: { cars, text: updatedParams } });
        // Assume search API is called and `cars` gets updated
    };

    const renderSearchTags = () => {
        const tags = [];
        for (const [key, value] of Object.entries(searchParams)) {
            if (value) {
                tags.push(
                    <div className="search-tag" key={key}>
                        {value}
                        <span
                            className="remove-tag"
                            onClick={() => removeTag(key as keyof SearchRequest)}
                        >
                            ✕
                        </span>
                    </div>
                );
            }
        }
        return tags;
    };

    return (
        <div className='search-container'>
            <div className="search-options-container">
                {renderSearchTags()}
            </div>
            <div className="sort-filtr-container">
                <div>
                    <select className="sort-filtr-button" value={sortCriteria} onChange={handleSortChange}>
                        <option value="model">Моделлю</option>
                        <option value="manufacturer">Виробник</option>
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
