// Styles
import '../AuthPageComponents.css';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../authSlice';





const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // You can make a server request to check the login here
        // If the login is successful, you can dispatch the login action

        if (username == 'user@gmail.com' && password == '1234') {
            dispatch(login());
            navigate('/search');
        } else {
            alert('Невірний логін або пароль');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <img src="/images/login-car.png" alt="Car" className="auth-car"/>
            <div className="auth-container">
                <div className="auth-social-container">
                    <img src="/images/apple.png" alt="Car"/>
                    <img src="/images/google.png" alt="Car"/>
                    <img src="/images/fbook.png" alt="Car"/>
                </div>
                <h3>або</h3>
                <input
                    type="email"
                    placeholder="Електронна адреса"
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
                <a>Забули пароль?</a>
                <button className="auth-button">Увійти</button>
                <div>
                    <span>Не маєте акаунту?</span>
                    <Link to='/auth/register'>Зареєструватися</Link>
                </div>
            </div>

        </form>
    );
};

export default Login;