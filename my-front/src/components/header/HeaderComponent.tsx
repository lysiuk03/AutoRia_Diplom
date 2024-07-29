import React from 'react';
import './HeaderComponent.css';
import CarSearchForm from "../carSearchForm/CarSearchForm.tsx";


const HeaderComponent: React.FC = () => (

        <>
            <div className="header-container">
                <img src="/images/logo.png" alt="Logo" className="logo-image"/>
                <img src="/images/road.png" alt="Road" className="background-image"/>
                <img src="/images/blue_car.png" alt="Car" className="car-image"/>
            </div>
            <nav className="menu-container">
                <div className="menu">
                    <a href="#">Вживані авто</a>
                    <a href="#">Нові авто</a>
                    <a href="#">Новини</a>
                </div>
                <div className="user-actions">
                    <a href="#"><img src="/images/notif.png" alt="Notifications"/></a>
                    <a href="#"><img src="/images/profile.png" alt="Profile"/></a>
                    <a href="#">Профіль</a>
                    <a href="#" className="sell-car-btn">ПРОДАТИ АВТО</a>
                </div>
            </nav>
            <CarSearchForm/>
            <section>
                <h1 className={"auto-world-1"}>№<span> </span>1</h1>
                <h3 className={"auto-world-2"}>В СВІТІ АВТО</h3>
            </section>
            <section className="statistic-label">
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
            </section>
        </>
    )
;

export default HeaderComponent;
