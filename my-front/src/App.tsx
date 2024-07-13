import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ContainerDefault from './containers/default/ContainerDefault';
import RegisterPage from './account/register/RegisterPage';
import LoginPage from "./account/login/LoginPage.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ContainerDefault />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
