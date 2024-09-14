import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';




const PasswordForgot: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/edit-account/password/recovery');
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
