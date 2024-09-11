// Libraries
import React from "react";
import { Layout } from 'antd';

// Styles
import './EditAccountPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import {Outlet} from "react-router-dom";
import Logo from "../../components/logo/Logo.tsx";
import Navbar from "../../components/navbar/Navbar.tsx";


const { Header, Content,Footer } = Layout;


const MainSearchPage: React.FC = () => {
    return (
        <Layout className="edit-account-layout">
            <Header className="edit-account-header">
                <Logo left/>
                <Navbar additionalClass="left" />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default MainSearchPage;
