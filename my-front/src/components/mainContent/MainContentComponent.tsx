import React from 'react';
import './MainContentComponent.css';
import CarCarousel from "../carCarousel/CarCarousel.tsx";
import {cars} from "../../data/cars.ts";
const MainContentComponent = () => (
    <div className="main-comp">
        <div className="bg-img">
            <img src="/images/vector.png" alt="Vector"/>
        </div>
        <div className="content-title title-1">
            <h3>АВТОМОБІЛІ, <br/>ЯКІ ШУКАЮТЬ НАЙЧАСТІШЕ</h3>
        </div>
        <div>
                <CarCarousel cars={cars} />
        </div>
        <div className="center-width logo-container">
            <p>Тут будуть лого авто</p>
        </div>
        <div className="content-title">
            <h3>АВТОМОБІЛЬНИЙ ДАЙДЖЕСТ</h3>
        </div>
        <div className="center-width digest-container">
            <p>Тут буде дайджест</p>
        </div>
        <div className="solid-container">
            <h3>ВІДГУКИ НАШИХ КЛІЄНТІВ</h3>
            <p>Тут будуть відгуки</p>
        </div>
    </div>
);

export default MainContentComponent;