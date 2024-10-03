// Libraries
import React from "react";
import { Layout } from 'antd';

// Styles
import './EditAccountPage.css';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";


const { Content,Footer } = Layout;


const MainSearchPage: React.FC = () => {
    return (
        <Layout className="edit-account-layout">
             <Navbar/>
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
