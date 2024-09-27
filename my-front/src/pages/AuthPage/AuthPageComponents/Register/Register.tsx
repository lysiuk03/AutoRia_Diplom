import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AuthPageComponents.css';
import { useDispatch } from 'react-redux';
import {register} from "../../authSlice.ts";

const Register: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [username, setUsername] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Full name validation
        const nameParts = fullName.trim().split(' ');
        if (nameParts.length < 2) {
            newErrors.fullName = 'Будь ласка, введіть повне ім’я (ім’я та прізвище).';
            setFullName('');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Будь ласка, введіть дійсну електронну адресу.';
            setEmail('');
        }



        // Username validation
        if (!username.trim()) {
            newErrors.username = 'Будь ласка, введіть ім’я користувача.';
            setUsername('');
        }

        // Password validation
        if (password.length < 6) {
            newErrors.password = 'Пароль має містити принаймні 6 символів.';
            setPassword('');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const [firstName, lastName] = fullName.split(' ');

        const formData = new FormData();
        formData.append("FirstName", firstName);
        formData.append("LastName", lastName);
        formData.append("Email", email);
        formData.append("UserName", username);
        formData.append("Password", password);
        if (image) {
            formData.append("Image", image); // Include the image file if present
        }

        try {
            const response = await fetch('http://localhost:5174/api/Accounts/Registration', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);  // Зберігаємо токен
                dispatch(register(data.token));  // Оновлюємо стан авторизації в Redux
                navigate('/account');  // Перенаправляємо на сторінку профілю
            }
            else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="auth-form" onSubmit={handleRegister}>
            <img src="/images/register-car.png" alt="Car" className="auth-car" />
            <div className="auth-container">
                <div className="auth-social-container">
                    <img src="/images/apple.png" alt="Apple"/>
                    <img src="/images/google.png" alt="Google"/>
                    <img src="/images/fbook.png" alt="Facebook"/>
                </div>
                <h3>або</h3>

                <input
                    type="text"
                    placeholder="Повне ім`я"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}

                <input
                    type="email"
                    placeholder="Електронна адреса"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'input-error' : ''}
                />
                {errors.username && <p className="error-message">{errors.username}</p>}

                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`password-input ${errors.password ? 'input-error' : ''}`}
                    />
                    <img
                        src="/images/open-eye.png"
                        alt="Toggle Password Visibility"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                    />
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    className="file-input"
                />

                <button type="submit" className="auth-button">
                    Зареєструватися
                </button>
                <div>
                    <span>Вже маєте акаунт?</span>
                    <Link to='/auth/login'>Увійти</Link>
                </div>
            </div>
        </form>
    );
};

export default Register;
