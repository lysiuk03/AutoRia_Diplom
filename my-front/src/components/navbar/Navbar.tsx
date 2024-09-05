// Libraries
import React from 'react';
import { Link } from 'react-router-dom';


// Styles
import './Navbar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './store';

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

    const notifIcon = additionalClass === 'dark' ? '/images/notif-dark.png' : '/images/notif.png';
    const profileIcon = additionalClass === 'dark' ? '/images/profile-dark.png' : '/images/profile.png';

    return (
        <nav className={`menu-container ${additionalClass}`}>
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
                <a href="#" className="sell-car-btn">Продати авто</a>
            </div>
        </nav>
    );
};


export default Navbar;