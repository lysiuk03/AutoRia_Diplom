// Libraries
import React, { useState } from 'react';
import { Pagination } from 'antd';

// Styles
import './SearchContent.css';

// Data
import { cars } from "../../../../data/cars";

// Components
import SearchCarCard from "./SearchContetComponents/SearchCarCard.tsx";


const SearchContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCars = cars.slice(startIndex, startIndex + itemsPerPage);
    const [criteria, setCriteria] = useState([
        'Легкові',
        'Kia',
        '2021',
        'Київська'
    ])

    const removeCriterion = (index) => {
        const newCriteria = criteria.filter((_, i) => i !== index);
        setCriteria(newCriteria);
    };

    return (
        <div className='search-container'>
            <div className="search-options-container">
                <div className="options-container">
                    {criteria.map((criterion, index) => (
                        <div key={index} className="criterion-item">
                            <span>{criterion}</span>
                            <button onClick={() => removeCriterion(index)} className="remove-btn">✖</button>
                        </div>
                    ))}
                </div>
                <button className="refine-search-button">Уточнити пошук</button>
            </div>
            <div className="sort-filtr-container">
                <div>
                    <select className="sort-filtr-button" defaultValue="">
                        <option value="" disabled hidden>Сортувати</option>
                    </select>
                    <button className="sort-filtr-button">Фільтр</button>
                </div>
                <h5>{cars.length} авто</h5>
            </div>
            <div className="car-cards-container">
                {currentCars.map((car, index) => (
                    <SearchCarCard key={index} {...car} />
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