import React from 'react';
import {Outlet} from 'react-router-dom';
import './EditPassword.css';

const EditPassword: React.FC = () => {

    return (
        <div className="edit-account-container">
            <p>Головна/Особистий кабінет/Редагувати профіль/<span>Зміна пароля</span></p>
           <Outlet/>
        </div>
    );
};

export default EditPassword;