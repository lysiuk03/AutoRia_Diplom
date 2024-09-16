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
import HomeContent from './pages/MainSearchPage/MainSearchPageComponents/HomeContent/HomeContent.tsx';
import SearchContent from './pages/MainSearchPage/MainSearchPageComponents/SearchContent/SearchContent.tsx';
import EditAccountPage from "./pages/EditAccountPage/EditAccountPage.tsx";
import ProfileEditing from "./pages/EditAccountPage/EditAccountPageComponents/ProfileEditing/ProfileEditing.tsx";
import EditPassword
    from "./pages/EditAccountPage/EditAccountPageComponents/EditAccountPageComponents/EditPassword/EditPassword.tsx";
import PasswordChange
    from "./pages/EditAccountPage/EditAccountPageComponents/EditAccountPageComponents/EditPassword/EditPasswordComponents/PasswordChange/PasswordChange.tsx";
import PasswordForgot
    from "./pages/EditAccountPage/EditAccountPageComponents/EditAccountPageComponents/EditPassword/EditPasswordComponents/PasswordForgot/PasswordForgot.tsx";
import PasswordRecovery
    from "./pages/EditAccountPage/EditAccountPageComponents/EditAccountPageComponents/EditPassword/EditPasswordComponents/PasswordRecovery/PasswordRecovery.tsx";
import PostAdPage from "./pages/PostAdPage/PostAdPahe.tsx";
import AdForm from "./pages/PostAdPage/PostAdPageComponents/AdForm/AdForm.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSearchPage />}>
                    <Route index element={<HomeContent />} />
                    <Route path="home" element={<HomeContent />} />
                    <Route path="search" element={<SearchContent />} />
                </Route>
                <Route path="/auth" element={<AuthPage />}>
                    <Route index element={<Register />} />
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
                <Route path="/edit-account" element={<EditAccountPage />}>
                    <Route index element={<ProfileEditing/>} />
                    <Route path="profile" element={<ProfileEditing/>} />
                    <Route path="password" element={<EditPassword />}>
                        <Route index element={<PasswordChange/>} />
                        <Route path="change" element={<PasswordChange/>} />
                        <Route path="forgot" element={<PasswordForgot/>} />
                        <Route path="recovery" element={<PasswordRecovery/>} />
                    </Route>
                </Route>
                <Route path="/post" element={<PostAdPage />}>
                    <Route index element={<AdForm/>} />
                    <Route path="ad" element={<AdForm/>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;