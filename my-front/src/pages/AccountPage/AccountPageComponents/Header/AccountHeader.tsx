// Styles
import './AccountHeader.css';

// Standard libraries
import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

// Custom components
import Navbar from '../../../../components/navbar/Navbar.tsx';
import Logo from '../../../../components/logo/Logo.tsx';
import ProfileCard from "./HeaderComponents/ProfileCard.tsx";

interface ProfileCardProps {
    name: string;
    id: number;
    location: string;
    rating: number;
    imageUrl: string[];
}

const AccountHeader: React.FC = () => {

    const profileData:ProfileCardProps = {
        name: 'Давид Войтко',
        id: 14411374,
        location: 'Рівне',
        rating: 8.6,
        imageUrl: ['/images/men.png']
    };

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    interface MenuItem {
        key: string;
        label: string;
        path: string;
    }

    const menuItems: MenuItem[] = [
        { key: '1', label: 'Мої оголошення', path: '/account/ads' },
        { key: '2', label: 'Обране', path: '/account/favorites' },
        { key: '3', label: 'Перевірки авто', path: '/account/auto-check' },
        { key: '4', label: 'Рахунки', path: '/account/bills' },
    ];
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/edit-account');
    };


    return (
        <>
            <Logo left/>
            <Navbar additionalClass="left" />
            <div className="profile-overview-container">
                <div className="user-info-actions">
                    <ProfileCard {...profileData} />
                    <div className="btn-container">
                        <button className="chat-button none-line">Чат з покупцями</button>
                        <button className="edit-profile-button" onClick={handleNavigate}>
                        <img src="/images/edit.png" alt="Edit"/>
                            Редагувати профіль
                    </button>
                </div>
            </div>
            <div>
                    <hr/>
                    <nav className="account-menu">
                        {menuItems.map(item => (
                            <div key={item.key} className={`menu-item ${isActive(item.path) ? 'active' : ''}`}>
                                <Link to={item.path}>{item.label}</Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default AccountHeader;