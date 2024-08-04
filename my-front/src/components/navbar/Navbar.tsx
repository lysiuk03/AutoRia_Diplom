// Libraries
import React from 'react';

// Styles
import './Navbar.css';

interface NavbarProps {
    additionalClass?: string;
}

const Navbar: React.FC<NavbarProps> = ({ additionalClass }) => (
    <nav className={`menu-container ${additionalClass}`}>
        <div className="menu">
            <a href="#">Вживані авто</a>
            <a href="#">Нові авто</a>
            <a href="#">Новини</a>
        </div>
        <div className="user-actions">
            <a href="#"><img src="/images/notif.png" alt="Notifications" className="notif-icon"/></a>
            <a href="#"><img src="/images/profile.png" alt="Profile" className="profile-icon"/></a>
            <a href="#">Профіль</a>
            <a href="#" className="sell-car-btn">Продати авто</a>
        </div>
    </nav>
);

export default Navbar;