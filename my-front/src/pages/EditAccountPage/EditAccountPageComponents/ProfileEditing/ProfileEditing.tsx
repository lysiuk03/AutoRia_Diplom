import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeJwt } from "jose";
import { RootState } from "../../../../redux/store.ts";
import "./ProfileEditing.css";

interface DecodedToken {
    firstName?: string;
    lastName?: string;
    id?: string;
    location?: string;
    rating?: number;
    photo?: string;
}

type Profile = {
    firstName: string;
    lastName: string;
    region: string;
    city: string;
    rating: number;
    phoneNumber: string;
    photo: string;
};

const API_URL = "http://localhost:5174/api/Accounts";

const ProfileEditing: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [userId, setUserId] = useState<number | null>(null);
    const [userData, setUserData] = useState<Profile | null>(null);
    const [image, setImage] = useState<File | null>(null);
    let currentPhoto = userData?.photo;

    const [profileData, setProfileData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        city: '',
        region: '',
        photo: '',
        email: '',
        phoneNumber: '',
        userName: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = decodeJwt(token) as DecodedToken;
            const userId = Number(decodedToken.id);
            setUserId(userId);
            if (userId) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(`${API_URL}/GetUserById/${userId}`);
                        setUserData(response.data);
                        setProfileData({
                            firstName: response.data.firstName,
                            middleName: response.data.middleName,
                            lastName: response.data.lastName,
                            city: response.data.city,
                            region: response.data.region,
                            photo: response.data.photo,
                            email: response.data.email,
                            phoneNumber: response.data.phoneNumber,
                            userName: response.data.userName,
                        });
                        currentPhoto = response.data.photo;
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                };
                fetchUserData();
            }
        }
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (token && userId) {
                const formData = new FormData();
                formData.append("firstName", profileData.firstName);
                formData.append("middleName", profileData.middleName);
                formData.append("lastName", profileData.lastName);
                formData.append("city", profileData.city);
                formData.append("region", profileData.region);
                formData.append("email", profileData.email);
                formData.append("phoneNumber", profileData.phoneNumber);
                formData.append("userName", profileData.userName);

                // Append image only if it is uploaded
                if (image) {
                    formData.append("photo", image);
                }

                await axios.post(`${API_URL}/UpdateProfile/update-profile/${userId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate('/account');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="edit-account-container">
            <h2 className='edit-account-h2'>Редагування профілю</h2>
            <div className="edit-account-details">
                <img src={`http://localhost:5174/images/800_${currentPhoto}`} alt="Profile" className="profile-image" />
                <div className="container-mg-left">
                    <div>
                        <p>Ваш клієнтський ID: {userId}</p>
                        <p>{profileData.email}</p>
                        <Link to='/edit-password' className="edit-password-link">Натисніть, щоб змінити пароль</Link>
                    </div>
                </div>
            </div>

            <form className="edit-account-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Ім'я</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={profileData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Прізвище</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>По батькові</label>
                    <input
                        type="text"
                        name="middleName"
                        value={profileData.middleName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Область</label>
                    <input
                        type="text"
                        name="region"
                        value={profileData.region}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Місто</label>
                    <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Телефон</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Фото:</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (file) {
                                setImage(file);
                                setProfileData((prevData) => ({
                                    ...prevData,
                                    photo: file.name,
                                }));
                            }
                        }}
                        className="file-input"
                    />
                </div>
                <button type="submit" className="form-btn">
                    Оновити профіль
                </button>
            </form>
        </div>
    );
};

export default ProfileEditing;
