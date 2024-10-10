// Libraries
import React from "react";
import { Layout } from 'antd';
import {Navigate, Outlet} from "react-router-dom";
import {RootState} from "../../redux/store.ts";


// Components
import PagesFooter from "../../components/footer/PagesFooter";
import Navbar from "../../components/navbar/Navbar";
import {useSelector} from "react-redux";

const {Content,Footer} = Layout;


const PostAdPage: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (
        <Layout className="base-layout">
            <Navbar additionalClass="dark"/>
            <Content className="base-content">
                {isAuthenticated ? (
                    <Outlet />
                ) : (
                    <Navigate to="/auth/register" replace />
                )}
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};


export default PostAdPage;