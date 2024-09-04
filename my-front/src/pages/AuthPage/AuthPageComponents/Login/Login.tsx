import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AuthPageComponents.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Implement login logic here
        try {
            // Simulate login request
            const response = await fetch('http://localhost:5174/api/Accounts/SignIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Handle successful login
            navigate('/search');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Невірний логін або пароль');
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <img src="/images/login-car.png" alt="Car" className="auth-car" />
            <div className="auth-container">
                <div className="auth-social-container">
                    <img src="/images/apple.png" alt="Apple" />
                    <img src="/images/google.png" alt="Google" />
                    <img src="/images/fbook.png" alt="Facebook" />
                </div>
                <h3>або</h3>
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
                <a href="/forgot-password">Забули пароль?</a>
                <button type="submit" className="auth-button">
                    Увійти
                </button>
                <div>
                    <span>Не маєте акаунту?</span>
                    <Link to='/auth/register'>Зареєструватися</Link>
                </div>
            </div>
        </form>
    );
};

export default Login;
