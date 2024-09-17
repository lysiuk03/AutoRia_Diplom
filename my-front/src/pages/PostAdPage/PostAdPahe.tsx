// Libraries
import React from "react";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";


// Components
import PagesFooter from "../../components/footer/PagesFooter";
import Navbar from "../../components/navbar/Navbar";
import Logo from "../../components/logo/Logo";

const { Header, Content,Footer} = Layout;


const PostAdPage: React.FC = () => {
    return (
        <Layout className="base-layout">
            <Header className="base-header">
                <Logo dark left/>
                <Navbar additionalClass="dark" />
            </Header>
            <Content className="base-content">
                <Outlet/>
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default PostAdPage;