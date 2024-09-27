import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/authSlice.ts';
import '../AuthPageComponents.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Створюємо диспетчер Redux

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Будь ласка, введіть дійсну електронну адресу.';
            setEmail('');  // Clear the input if invalid
        }

        // Password validation
        if (password.length < 6) {
            newErrors.password = 'Пароль має містити принаймні 6 символів.';
            setPassword('');  // Clear the input if invalid
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Run validation before submitting
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5174/api/Accounts/SignIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();

            // Збереження користувача у Redux
            dispatch(login(userData));

            navigate('/search');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Невірний логін або пароль');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

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

                <a href="/edit-account/password/forgot">Забули пароль?</a>
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
