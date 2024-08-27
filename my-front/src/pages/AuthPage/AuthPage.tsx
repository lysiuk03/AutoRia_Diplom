
// Styles
import './AuthPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import {Outlet} from "react-router-dom";
const { Header,Footer } = Layout;

import Navbar from '../../components/navbar/Navbar.tsx';
import Logo from '../../components/logo/Logo.tsx';
import {Layout} from "antd";
import React from "react";


const AuthPage: React.FC = () => {
    return (
        <Layout className="auth-layout">

            <img src="/images/auth-fon-vector1.png" alt="Road" className="background-image-1"/>
            <img src="/images/auth-fon-vector2.png" alt="Fon1" className="background-image-2"/>
            <img src="/images/auth-footer-fon.png" alt="Fon2" className="background-image-3"/>
            <Header className="auth-header">
                <Navbar  additionalClass="auth-navbar"/>
                <Logo dark={true} />
            </Header>
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