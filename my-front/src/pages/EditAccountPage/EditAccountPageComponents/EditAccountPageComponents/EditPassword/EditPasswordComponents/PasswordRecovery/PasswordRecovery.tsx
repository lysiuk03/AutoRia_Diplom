import React, { useState } from 'react';



const PasswordRecovery: React.FC = () => {
    const [showNewPassword1, setShowNewPassword1] = useState<boolean>(false);
    const [showNewPassword2, setShowNewPassword2] = useState<boolean>(false);
    const [recoveryCode, setRecoveryCode] = useState<string>(''); // Поле для ввода кода
    const [newPassword1, setNewPassword1] = useState<string>('');
    const [newPassword2, setNewPassword2] = useState<string>('');

    const togglePasswordVisibility = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, currentState: boolean) => {
        setFunction(!currentState);
    };

    return (
        <>
            <h2 className='edit-account-h2'>Відновлення пароля</h2>
            <p className="txt-20">На Ваш email _____@gmail.com протягом пяти хвилини прийде лист з кодом для відновлення паролю.</p>
            <form className="edit-password-form">
                <div className="edit-password-container">
                    <label>Введіть код з e-mail:</label>
                    <input
                        type="text"
                        value={recoveryCode}
                        onChange={(e) => setRecoveryCode(e.target.value)}
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
                </div>
            </form>
        </>
);
};

export default PasswordRecovery;
