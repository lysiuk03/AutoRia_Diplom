// Libraries
import React from 'react';

// Styles
import './MainSearchHeader.css';

// Components
import CarSearchForm from "./HeaderComponents/CarSearchForm";
import Navbar from '../../../../components/navbar/Navbar';


const MainSearchHeader: React.FC = () => (

        <>
            <div className="header-container">
            <Navbar/>
                <img src="/images/road.png" alt="Road" className="background-image"/>
                <img src="/images/blue_car.png" alt="Car" className="car-image"/>
            </div>

            <CarSearchForm/>
            <div className="auto-info-labels">
                <section className="number-1">
                    <h1 className={"auto-world-1"}>№<span> </span>1</h1>
                    <h3 className={"auto-world-2"}>В СВІТІ АВТО</h3>
                </section>
                    <div className="grid-container">
                        <div className="grid-item">
                            <span>350 000 +</span>
                            <p>ПРОПОЗИЦІЙ НА САЙТІ</p>
                        </div>
                        <div className="grid-item">
                            <span>850 000 +</span>
                            <p>ЗАДОВОЛЕНИХ ВЛАСНИКІВ</p>
                        </div>
                        <div className="grid-item">
                            <span>1000 +</span>
                            <p>ПРОФЕСІОНАЛІВ ДЛЯ ДОПОМОГИ</p>
                        </div>
                    </div>
            </div>
           
        </>
    )
;

export default MainSearchHeader;