import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordForgot: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!email || !password) {
            console.error('Email and password are required');
            return;
        }

        try {
            // Спочатку отримати користувача за електронною поштою
            const response = await fetch(`http://localhost:5174/api/Accounts/GetUserByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('User not found or error occurred');
            }

            const userData = await response.json();
            console.log('User data:', userData);
            console.log('Id:', userData.id);

            // Тепер оновлюємо пароль
            const updateResponse = await fetch(`http://localhost:5174/api/Accounts/UpdatePassword/update-password/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ NewPassword: password }),
            });

            if (!updateResponse.ok) {
                const errorText = await updateResponse.text();
                throw new Error(errorText || 'Failed to update password');
            }

            // Повідомлення про успіх
            console.log('Password successfully updated');
            alert('Пароль успішно оновлено!');

            // Можливо, перенаправити на іншу сторінку після успішного оновлення
            navigate('/');

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <h2 className='edit-account-h2'>Відновлення пароля</h2>
            <p className="txt-20">Для відновлення пароля, виберіть ваш e-mail.</p>
            <form className="edit-password-form">
                <div className="edit-password-container">
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="edit-password-container">
                    <label>Новий пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="right-container">
                    <button className="edit-password-btn" type="button" onClick={handleClick}>
                        Продовжити
                    </button>
                </div>
            </form>
        </>
    );
};

export default PasswordForgot;
