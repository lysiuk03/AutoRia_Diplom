import './AccountHeader.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../../../components/navbar/Navbar';
import ProfileCard from "./HeaderComponents/ProfileCard";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { decodeJwt } from 'jose';


// Інтерфейс для декодованого токена
interface DecodedToken {
    firstName?: string;
    lastName?: string;
    id?: string;
    location?: string;
    rating?: number;
    photo?: string;
}

// Оновлений інтерфейс для ProfileCardProps
interface ProfileCardProps {
    name: string;
    id: string; // Змінено на string для id
    imageUrl: string[];
}

const AccountHeader: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token); // Отримуємо токен з Redux

    // Декодуємо токен
    let profileData: ProfileCardProps = {
        name: 'Невідомий користувач',
        id: '0',
        imageUrl: ['/images/default.png'],
    };

    if (token) {
        const decodedToken = decodeJwt(token) as DecodedToken; // Вказуємо тип для decodedToken

        // Використовуємо властивості з декодованого токена
        profileData = {
            name: decodedToken?.firstName ? `${decodedToken.firstName} ${decodedToken.lastName}` : 'Невідомий користувач',
            id: decodedToken?.id || '0', // Використання id як рядка
            imageUrl: decodedToken?.photo ? [decodedToken.photo] : ['/images/default.png'],
        };
        console.log(profileData);
    }

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { key: '1', label: 'Мої оголошення', path: '/account/ads' },
        { key: '2', label: 'Обране', path: '/account/favorites' },
    ];



    return (
        <div className="nameheader">

            <Navbar/>


            <div className="profile-overview-container">
                <div className="user-info-actions">
                    <ProfileCard {...profileData} />
                </div>
                <div>
                    <hr />
                    <nav className="account-menu">
                        {menuItems.map(item => (
                            <div key={item.key} className={`menu-item ${isActive(item.path) ? 'active' : ''}`}>
                                <Link to={item.path}>{item.label}</Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AccountHeader;
