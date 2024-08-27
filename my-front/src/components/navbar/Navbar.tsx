// Libraries
import React from 'react';

// Styles
import './Navbar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {RootState} from "../../store.ts";

interface NavbarProps {
    additionalClass?: string;
}
const Navbar: React.FC<NavbarProps> = ({ additionalClass }) =>
{
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/account');
        } else {
            navigate('/auth/login');
        }
    };

    return (
        <nav className={`menu-container ${additionalClass}`}>
            <div className="menu">
                <a href="#">Вживані авто</a>
                <a href="#">Нові авто</a>
                <a href="#">Новини</a>
            </div>
            <div className="user-actions">
                <a href="#"><img src="/images/notif.png" alt="Notifications" className="notif-icon"/></a>
                <button onClick={handleProfileClick} className="profile-button">
                    <img src="/images/profile.png" alt="Profile or Login" className="profile-icon" />
                    Профіль
                </button>
                <a href="#" className="sell-car-btn">Продати авто</a>
            </div>
        </nav>
    );
};


export default Navbar;