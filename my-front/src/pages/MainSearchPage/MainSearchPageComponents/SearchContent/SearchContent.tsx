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
import axios from "axios";

const SearchContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialSearchRequest: Car[] = location.state?.cars || []; // Handle case where state might be undefined
    const initialSearchParams: SearchRequest = location.state?.text || {
        searchType: 'Всі',
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
    const [itemsPerPage,setItemsPerPage] = useState(4);

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
        window.scrollTo(0, 1080);
        setCurrentPage(page);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(event.target.value);
    };

    const sortedCars = [...cars].sort((a, b) => {
        if (sortCriteria === 'model') {
            // Check if carModel exists before trying to access its name
            const modelA = a.carModel?.name || "";
            const modelB = b.carModel?.name || "";
            return modelA.localeCompare(modelB);
        } else if (sortCriteria === 'manufacturer') {
            // Check if carBrand exists before trying to access its name
            const brandA = a.carBrand?.name || "Невідомий бренд";
            const brandB = b.carBrand?.name || "Невідомий бренд";
            return brandA.localeCompare(brandB);
        }
        return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCars = sortedCars.slice(startIndex, startIndex + itemsPerPage);

    const removeTag = (key: keyof SearchRequest) => {
        const updatedParams = {
            ...searchParams,
            [key]: "Будь-який" // Clear the value of the removed tag
        };
        setSearchParams(updatedParams);
        // Perform the new search and update the URL state
        performSearch(updatedParams);
    };

    const performSearch = async (updatedParams: SearchRequest) => {

        const response = await axios.post<Car[]>('http://localhost:5174/api/Car/search', updatedParams);
        console.log(response.data); // Обробка отриманих даних
        navigate("/search", { state: { cars: response.data, text: updatedParams } });

    };

    const renderSearchTags = () => {
        const tags = [];
        for (const [key, value] of Object.entries(searchParams)) {
            if (value && value !== "Будь-який") { // Перевірка на "Будь-який"
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

                </div>
                <h5>{cars.length} авто</h5>
            </div>
            <div className="car-cards-container">
                {currentCars.map((car, index) => (
                    <SearchCarCard key={`${car.vin}-${index}`} {...car} />
                ))}
            </div>
            <Pagination
                current={currentPage}
                total={cars.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                onShowSizeChange={(current, size) => {
                    setCurrentPage(current); // Reset to the first page when page size changes
                    setItemsPerPage(size); // Update the items per page
                }}
                align="center"
                className="custom-pagination"
                showSizeChanger={true} // Show size changer
                pageSizeOptions={['4', '10', '20']} // Options for page size
            />
        </div>
    );
};

export default SearchContent;
