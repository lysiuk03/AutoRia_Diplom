import './AccountHeader.css';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/navbar/Navbar';
import Logo from '../../../../components/logo/Logo';
import ProfileCard from "./HeaderComponents/ProfileCard";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { decodeJwt } from 'jose'; // Імпортуємо jose

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
    phoneNumber: string; // Додано поле location
    rating: number; // Додано поле rating
    imageUrl: string[];
}

const AccountHeader: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token); // Отримуємо токен з Redux

    // Декодуємо токен
    let profileData: ProfileCardProps = {
        name: 'Невідомий користувач',
        id: '0',
        phoneNumber: 'Місце не вказано',
        rating: 0,
        imageUrl: [''],
    };

    if (token) {
        const decodedToken = decodeJwt(token) as DecodedToken; // Вказуємо тип для decodedToken

        // Використовуємо властивості з декодованого токена
        profileData = {
            name: decodedToken?.firstName ? `${decodedToken.firstName} ${decodedToken.lastName}` : 'Невідомий користувач',
            id: decodedToken?.id || '0', // Використання id як рядка
            phoneNumber: decodedToken?.location || 'Місце не вказано',
            rating: decodedToken?.rating || 0,
            imageUrl: decodedToken?.photo ? [`http://localhost:5174/images/800_${decodedToken.photo}`] : ['http://localhost:5174/images/'],
        };
        console.log(profileData)
    }

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;



    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/edit-account');
    };

    return (
        <div className="nameheader">
            <div className="accbaseheader">
                <Logo left />
                <Navbar additionalClass="left" />
            </div>

            <div className="profile-overview-container">
                <div className="user-info-actions">
                    <ProfileCard {...profileData} />
                    <div className="btn-container">
                        <button className="edit-profile-button" onClick={handleNavigate}>
                            <img src="/images/edit.png" alt="Edit" />
                            Редагувати профіль
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountHeader;