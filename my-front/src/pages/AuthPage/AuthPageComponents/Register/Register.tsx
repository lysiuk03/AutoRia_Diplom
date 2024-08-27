import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../AuthPageComponents.css';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        // Handle form submission logic here
        navigate('/auth/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="auth-form" onSubmit={handleRegister}>
            <img src="/images/register-car.png" alt="Car" className="auth-car" />
            <div className="auth-container">
                <div className="auth-social-container">
                    <img src="/images/apple.png" alt="Apple" />
                    <img src="/images/google.png" alt="Google" />
                    <img src="/images/fbook.png" alt="Facebook" />
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