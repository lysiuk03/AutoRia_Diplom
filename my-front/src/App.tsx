import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import MainSearchPage from "./pages/MainSearchPage/MainSearchPage.tsx";
import AccountPage from "./pages/AccountPage/AccountPage.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";

// Account Page Components
import MyAds from "./pages/AccountPage/AccountPageComponents/MyAds/MyAds.tsx";
import Favorites from "./pages/AccountPage/AccountPageComponents/Favorites/Favorites.tsx";
import AutoCheck from "./pages/AccountPage/AccountPageComponents/AutoCheck/AutoCheck.tsx";
import Bills from "./pages/AccountPage/AccountPageComponents/Bills/Bills.tsx";

import Login from './pages/AuthPage/AuthPageComponents/Login/Login.tsx';
import Register from './pages/AuthPage/AuthPageComponents/Register/Register.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSearchPage />} />
                <Route path="/auth" element={<AuthPage />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/account" element={<AccountPage />}>
                    <Route index element={<MyAds />} />
                    <Route path="ads" element={<MyAds />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="auto-check" element={<AutoCheck />} />
                    <Route path="bills" element={<Bills />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;