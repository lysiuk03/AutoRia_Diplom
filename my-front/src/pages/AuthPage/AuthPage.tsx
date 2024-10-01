// Libraries
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

// Styles
import './AuthPage.css';

// Components
import Navbar from '../../components/navbar/Navbar.tsx';
import Logo from '../../components/logo/Logo.tsx';
import PagesFooter from "../../components/footer/PagesFooter";

const { Header,Footer } = Layout;

const AuthPage: React.FC = () => {
    return (
        <Layout className="auth-layout">
            <Header className="auth-header" >
                <Logo  />
                <Navbar  additionalClass="auth-navbar "/>

            </Header>
            <img src="/images/auth-fon-vector1.png" alt="Road" className="background-image-1"/>
            <img src="/images/auth-fon-vector2.png" alt="Fon1" className="background-image-2"/>
            <img src="/images/auth-footer-fon.png" alt="Fon2" className="background-image-3"/>

            <div className="container-content">
                <h1>Автівки, перевірені людьми</h1>
                <Outlet/>
            </div>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default AuthPage;