// Libraries
import React from "react";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";


// Components
import PagesFooter from "../../components/footer/PagesFooter";
import Navbar from "../../components/navbar/Navbar";
const {Content,Footer} = Layout;


const NewsPage: React.FC = () => {
    return (
        <Layout className="base-layout">
             <Navbar additionalClass="dark"/>
            <Content className="base-content">
                <Outlet/>
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default NewsPage;