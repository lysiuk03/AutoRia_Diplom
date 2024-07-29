import React from "react";
import { Layout} from 'antd';
import './index.css';
import FooterComponent from "../../components/footer/FooterComponent.tsx";
import HeaderComponent from "../../components/header/HeaderComponent.tsx";
import MainContentComponent from "../../components/mainContent/MainContentComponent.tsx";
const { Header, Content, Footer } = Layout;


const HomePage: React.FC = () => {
    return (
        <Layout className="layout">
            <Header className="header">
                <HeaderComponent/>
            </Header>
            <Content className="content">
                <MainContentComponent/>
            </Content>
            <Footer className="footer">
                    <FooterComponent/>
            </Footer>
        </Layout>
    );
};

export default HomePage;
