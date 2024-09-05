// Libraries
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import '../AuthPageComponents.css';


const Register: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Assuming fullName is split into firstName and lastName
        const [firstName, lastName] = fullName.split(' ');

        const formData = new FormData();
        formData.append("FirstName", firstName);
        formData.append("LastName", lastName);
        formData.append("Email", email);
        formData.append("UserName", username); // Assuming username is the email for simplicity
        formData.append("Password", password);

        if (image) {
            formData.append("Image", image);
        }

        try {
            const response = await fetch('http://localhost:5174/api/Accounts/Registration', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/');
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
                />
                <input
                    type="email"
                    placeholder="Електронна адреса"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                    />
                    <img
                        src="/images/open-eye.png"
                        alt="Toggle Password Visibility"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
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
