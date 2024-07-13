import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const ContainerDefault: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/login">Логін</Link>,
        },
        {
            key: '2',
            icon: <UploadOutlined />,
            label: <Link to="/register">Реєстрація</Link>,
        },
    ];

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={{ minWidth: 0 }}
                />
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default ContainerDefault;
