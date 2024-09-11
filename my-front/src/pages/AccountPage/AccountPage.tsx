// Libraries
import React from "react";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";

// Styles
import './AccountPage.css';

// Components
import AccountHeader from "./AccountPageComponents/Header/AccountHeader.tsx";
import PagesFooter from "../../components/footer/PagesFooter";



const { Header, Content,Footer } = Layout;

const AccountPage: React.FC = () => {

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

export default AccountPage;
