// Libraries
import React from "react";
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

// Styles
import './MainSearchPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import MainSearchHeader from "./MainSearchPageComponents/Header/MainSearchHeader";


const { Header, Content, Footer } = Layout;


const MainSearchPage: React.FC = () => {
    return (
        <Layout className="layout">
            <Header className="header">
                <MainSearchHeader/>
            </Header>

            <Content className="content">
                <Outlet />
            </Content>

            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default MainSearchPage;