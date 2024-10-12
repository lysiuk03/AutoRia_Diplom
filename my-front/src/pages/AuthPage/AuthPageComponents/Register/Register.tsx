import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AuthPageComponents.css';
import { useDispatch } from 'react-redux';
import { register } from "../../authSlice.ts";
import axios from 'axios';


const Register: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [phone, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [city, setCity] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        const [lastName, firstName, middleName] = fullName.split(' ');

        const formData = new FormData();
        formData.append("FirstName", firstName);
        formData.append("MiddleName", middleName);
        formData.append("LastName", lastName);
        formData.append("Email", email);
        formData.append("UserName", username);
        formData.append("Password", password);
        formData.append("PhoneNumber", phone);
        formData.append("City", city);
        if (image) {
            formData.append("Image", image); // Include the image file if present
        }
        console.log([...formData]);
        try {
            const response = await axios.post('http://localhost:5174/api/Accounts/Registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Handle the response
            const data = response.data;
            localStorage.setItem('token', data.token);  // Store the token
            dispatch(register(data.token));  // Update the auth state in Redux
            navigate('/account');  // Redirect to the profile page
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error during registration:', error.response.data);
                const newErrors: { [key: string]: string } = {};
                // Optionally, set the error messages to your state
                const validationErrors = error.response.data.errors;

                for (const key in validationErrors) {
                    newErrors[key] = validationErrors[key].join(', '); // Join error messages for each field
                }
                setErrors(newErrors); // Update errors state to show to the user
            } else {
                console.error('Unexpected error during registration:', error);
            }
        }
    }

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <form className="auth-form" onSubmit={handleRegister}>
                <img src="/images/register-car.png" alt="Car" className="auth-car"/>
                <div className="auth-container">

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
                        placeholder="Назва користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={errors.username ? 'input-error' : ''}
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}

                    <input
                        type="text"
                        placeholder="Номер телефону"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}

                    <input
                        type="text"
                        placeholder="Місто"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}

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