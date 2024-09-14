import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProfileEditing.css';
import "../../../AccountPage/AccountPageComponents/Header/HeaderComponents/ProfileCard.css";
import {renderStars} from "../../../../components/starRating/StarRating.tsx";



const ProfileEditing: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleClick = () => {
        alert('Image button clicked!');
    };
    return (
        <div className="edit-account-container">
            <h2 className='edit-account-h2'>Редагування профілю</h2>
            <div className="edit-account-details">
                <button className="profile-image-button" onClick={handleClick}>
                    <img src="/images/men.png" alt="Profile" className="profile-image"/>
                </button>
                <div className="container-mg-left">
                    <div>
                        <p>Ваш клієнтський ID: ________</p>
                        <p>dava*******06@gmail.com</p>
                        <div className="edit-account-rating">
                            <p>Ваш рейтинг</p>
                            {renderStars(8)}
                            <p><span>8</span></p>
                        </div>
                        <Link to='password' className="edit-password-link">Натисніть, щоб змінити пароль</Link>
                    </div>

                </div>
            </div>

            <form className="edit-account-form">
                <div className="form-row">
                    <label>Ім'я</label>
                    <input
                        type="text"
                        placeholder="Давид"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Прізвище</label>
                    <input
                        type="text"
                        placeholder="Войтко"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>По батькові</label>
                    <input
                        type="text"
                        placeholder="Андрійович"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Область</label>
                    <input
                        type="text"
                        placeholder="Рівненська"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Місто</label>
                    <input
                        type="text"
                        placeholder="Рівне"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>E-mail</label>
                    <input
                        type="email"
                        placeholder="dava*******06@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        placeholder="+380"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProfileEditing;
