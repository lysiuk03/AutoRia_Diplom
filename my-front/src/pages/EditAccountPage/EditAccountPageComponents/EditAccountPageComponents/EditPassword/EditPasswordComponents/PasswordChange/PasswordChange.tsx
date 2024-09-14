import React, { useState } from 'react';
import { Link } from 'react-router-dom';




const PasswordChange: React.FC = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword1, setShowNewPassword1] = useState<boolean>(false);
    const [showNewPassword2, setShowNewPassword2] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [newPassword1, setNewPassword1] = useState<string>('');
    const [newPassword2, setNewPassword2] = useState<string>('');

    const togglePasswordVisibility = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, currentState: boolean) => {
        setFunction(!currentState);
    };

    return (
        <>
            <h2 className='edit-account-h2'>Зміна пароля</h2>
            <p className="txt-20">Для зміни пароля введіть старий пароль і придумайте новий</p>
            <form className="edit-password-form">
                <div className="edit-password-container">
                    <label>Введіть поточний пароль</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                        src="/images/open-eye.png"
                        alt="Toggle Password Visibility"
                        onClick={() => togglePasswordVisibility(setShowCurrentPassword, showCurrentPassword)}
                        className="edit-password-toggle-icon"
                    />
                </div>
                <div className="edit-password-container">
                    <label>Введіть новий пароль:</label>
                    <input
                        type={showNewPassword1 ? 'text' : 'password'}
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value)}
                    />
                    <img
                        src="/images/open-eye.png"
                        alt="Toggle Password Visibility"
                        onClick={() => togglePasswordVisibility(setShowNewPassword1, showNewPassword1)}
                        className="edit-password-toggle-icon"
                    />
                </div>
                <div className="edit-password-container">
                    <label>Повторіть новий пароль:</label>
                    <input
                        type={showNewPassword2 ? 'text' : 'password'}
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                    />
                    <img
                        src="/images/open-eye.png"
                        alt="Toggle Password Visibility"
                        onClick={() => togglePasswordVisibility(setShowNewPassword2, showNewPassword2)}
                        className="edit-password-toggle-icon"
                    />
                </div>
                <div className="right-container">
                <button className="edit-password-btn" type="button">Змінити</button>
                <Link to='forgot' className="forgot-password-link">Забули пароль?</Link>
                </div>
            </form>
        </>
    );
};

export default PasswordChange;
