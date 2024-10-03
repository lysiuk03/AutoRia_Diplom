// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css'; 

// Типи
import { RootState } from "../../redux/store.ts";
import Logo from './NavbarComponents/Logo.tsx';
interface NavbarProps {
    additionalClass?: string;
}

const Navbar: React.FC<NavbarProps> = ({ additionalClass }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/account'); 
        } else {
            navigate('/auth/login'); 
        }
    };

    const notifIcon = additionalClass === 'dark' ? '/images/notif-dark.png' : '/images/notif.png';
    const profileIcon = additionalClass === 'dark' ? '/images/profile-dark.png' : '/images/profile.png';
    const isAddCarPage = location.pathname === '/post';
    const isDarkMode = additionalClass === 'dark' || additionalClass === 'darkly';



    return (
        <nav className={`menu-container ${additionalClass}`}>
            <Logo isDarkMode={isDarkMode} />
            <section className="nav-section">
            <div className="menu">
                <a href="#">Вживані авто</a>
                <a href="#">Нові авто</a>
                <Link to="/news">Новини</Link>
            </div>
            <div className="user-actions">
                <a href="#"><img src={notifIcon} alt="Notifications" className="notif-icon"/></a>
                <button onClick={handleProfileClick} className="profile-button">
                    <img src={profileIcon} alt="Profile or Login" className="profile-icon" />
                    Профіль
                </button>
                <Link to="/post" className="sell-car-btn" style={{ pointerEvents: isAddCarPage ? 'none' : 'auto', opacity: isAddCarPage ? 0.5 : 1 }}>Продати авто</Link>
            </div>
            </section>
        </nav>
    );
};

export default Navbar;