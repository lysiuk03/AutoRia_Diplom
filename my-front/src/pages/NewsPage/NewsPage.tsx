// Libraries
import React from "react";
import { Layout } from 'antd';

// Styles
import './NewsPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Logo from "../../components/logo/Logo";
const { Header, Content,Footer} = Layout;





const NewsPage: React.FC = () => {
    return (
        <Layout className="news-layout">
            <Header className="news-header">
                <Logo dark left/>
                <Navbar additionalClass="dark" />
            </Header>
            <Content className="news-content">
                <Outlet/>
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default NewsPage;