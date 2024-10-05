import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Для отримання userId з Redux
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import axios from 'axios';

const ProfileEditing = () => {
    const userId = useSelector((state) => state.auth.userId); // Отримання userId з Redux
    const [profileData, setProfileData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        city: '',
        region: '',
        photo: '',
        email: '',
        phoneNumber: '',
        userName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Ініціалізуємо useNavigate

    useEffect(() => {
        // Функція для отримання поточних даних профілю
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Помилка завантаження профілю:', error); // Виведення помилки в консоль
                setError('Помилка завантаження профілю');
            }
        };

        fetchProfileData();
    }, [userId]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.put(`http://localhost:5174/api/Accounts/UpdateProfile/update-profile/${1}`, profileData, {
                headers: {
                    'Content-Type': 'application/json' // Встановлення заголовка
                }
            });
            setSuccess('Профіль успішно оновлено');
            // Перенаправлення на головну сторінку
            navigate('/'); // Змінюємо на ваш шлях до головної сторінки
        } catch (error) {
            console.error('Помилка оновлення профілю:', error.response ? error.response.data : error.message); // Виведення помилки в консоль
            setError('Помилка оновлення профілю');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Редагування профілю</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ім'я:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>По-батькові:</label>
                    <input
                        type="text"
                        name="middleName"
                        value={profileData.middleName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Прізвище:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Місто:</label>
                    <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Регіон:</label>
                    <input
                        type="text"
                        name="region"
                        value={profileData.region}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Фото (URL):</label>
                    <input
                        type="text"
                        name="photo"
                        value={profileData.photo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Номер телефону:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ім'я користувача:</label>
                    <input
                        type="text"
                        name="userName"
                        value={profileData.userName}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Оновлення...' : 'Оновити профіль'}
                </button>
            </form>
        </div>
    );
};

export default ProfileEditing;
