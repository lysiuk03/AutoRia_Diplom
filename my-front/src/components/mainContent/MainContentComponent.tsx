import React from 'react';
import './MainContentComponent.css';
import CarCarousel from "../carCarousel/CarCarousel.tsx";
import {cars} from "../../data/cars.ts";
import CarLogoMenu from "../carLogoMenu/CarLogoMenu.tsx";
import Reviews from "../reviews/Reviews.tsx";
import Digest from "../digest/Digest.tsx";
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
            <CarLogoMenu/>
        </div>
        <div className="content-title">
            <h3>АВТОМОБІЛЬНИЙ ДАЙДЖЕСТ</h3>
        </div>
        <div className="center-width digest-container">
            <Digest/>
        </div>
        <div className="solid-container">
            <h3>ВІДГУКИ НАШИХ КЛІЄНТІВ</h3>
            <Reviews/>
        </div>
    </div>
);

export default MainContentComponent;