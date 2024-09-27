// src/pages/AccountPage/AccountPage.tsx
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
import './AccountPage.css';


// Компоненти
import AccountHeader from "./AccountPageComponents/Header/AccountHeader.tsx";
import PagesFooter from "../../components/footer/PagesFooter";

const { Header, Content, Footer } = Layout;

const AccountPage: React.FC = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Користувач не авторизований');
            return;
        }
        try {
            const response = await fetch('/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                console.log('Помилка доступу до профілю');
            }
        } catch (error) {
            console.error('Помилка запиту:', error);
        }
    };

    return (
        <Layout className="account-layout">

            <Header className="account-header">
                <AccountHeader />
            </Header>

            <Content>
                <div className="profile-container">
                    {profile ? (
                        <div>
                            <p>Ім'я: {123}</p>
                            <p>Email: {123}</p>
                        </div>
                    ) : (
                        <p>Завантаження...</p>
                    )}
                    <Outlet />
                </div>
            </Content>
            <Footer className="footer">
                <PagesFooter />
            </Footer>
        </Layout>
    );
};

export default AccountPage;
