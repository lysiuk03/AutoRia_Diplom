// Libraries
import React, {useEffect, useState} from "react";
import { Layout } from 'antd';
import './ProductPage.css';
import {Car} from '../../interfaces/Car';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import ProductInfo from "./ProductPageComponents/DescriptionInfo/ProductInfo.tsx";
import ImageGallery from "./ProductPageComponents/ImageGallery/ImageGallery.tsx";
import CompanyInfo from "./ProductPageComponents/CompanyInfo/CompanyInfo.tsx";
import CreditVinSection from "./ProductPageComponents/CreditVinSection/CreditVinSection.tsx";
import CarSalonDescription from "./ProductPageComponents/DescriptionInfo/CarSalonDescription.tsx";
import CarList from "./ProductPageComponents/CarList/CarList.tsx";
import BankFinancing from "./ProductPageComponents/BankFinancing/BankFinancing.tsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar.tsx";

const {Content, Footer } = Layout;


const ProductPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car>();
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state}

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Car>(`http://localhost:5174/api/Car/${id}`); // Replace with your actual API URL
                setCar(response.data);
                setLoading(false);
               console.log(response.data);
            } catch (err) {
                console.error('Failed to fetch car data', err);
                setError('Failed to load car data.');
                setLoading(false);
            }
        };

        if (id) {
            fetchCar();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!car) {
        return <div>Car not found</div>;
    }

    return (
        <Layout className="base-layout">
            <Navbar additionalClass="dark"/>
            <Content className="base-content product-container">
                <p className="path">Головна/<span>каталог</span></p>
                <div className="up-btn-container">
                    <button><img src="/images/search-2.png" alt="Search"/>Всі пропозиції {'BMW X6 M'}</button>
                    <button>Наступне авто {'BMW X6 M'}<img src="/images/right.png" alt="Right"/></button>
                </div>
                <div className="info-container">
                    <ProductInfo/>
                    <ImageGallery/>
                    <CompanyInfo/>
                    <CreditVinSection />
                </div>
                <div className="info-container">
                    <div className="details-btn-container">
                        <button className="details-btn">Технічні характеристики<img src="/images/down.png" alt="down"/></button>
                        <button className="details-btn">Загальні характеристики<img src="/images/down.png" alt="down"/></button>
                        <BankFinancing/>
                    </div>
                    <CarSalonDescription/>
                </div>
                <CarList/>
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default ProductPage;
