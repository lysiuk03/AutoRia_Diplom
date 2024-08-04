// Libraries
import React from "react";
import { Layout } from 'antd';

// Styles
import './AccountPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import AccountHeader from "./AccountPageComponents/Header/AccountHeader.tsx";
import {Outlet} from "react-router-dom";


const { Header, Content,Footer } = Layout;


const MainSearchPage: React.FC = () => {
    return (
        <Layout className="account-layout">
            <Header className="account-header">
                <AccountHeader/>
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
