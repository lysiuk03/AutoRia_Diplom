// Libraries
import React from 'react';

// Styles
import './HomeContent.css';

// Data
import { cars } from "../../../../data/cars";

// Components
import CarCarousel from "./HomeContentComponents/CarCarousel/CarCarousel";
import CarLogoMenu from "./HomeContentComponents/CarLogosMenu/CarLogoMenu";
import Reviews from "./HomeContentComponents/Reviews/Reviews";
import Digest from "./HomeContentComponents/Digest/Digest";

const HomeContent = () => (
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

export default HomeContent;