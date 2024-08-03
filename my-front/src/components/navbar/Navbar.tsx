// Libraries
import React from 'react';

// Styles
import './Navbar.css';

const Navbar: React.FC = () => (
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
            <a href="#" className="sell-car-btn">Продати авто</a>
        </div>
    </nav>
);

export default Navbar;
