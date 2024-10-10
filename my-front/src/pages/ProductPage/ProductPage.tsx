// Libraries
import React, {useEffect, useState} from "react";
import { Layout } from 'antd';
import './ProductPage.css';
import {Car, UserCar} from '../../interfaces/Car';

// Components
import PagesFooter from "../../components/footer/PagesFooter";
import ProductInfo from "./ProductPageComponents/DescriptionInfo/ProductInfo.tsx";
import ImageGallery from "./ProductPageComponents/ImageGallery/ImageGallery.tsx";
import CompanyInfo from "./ProductPageComponents/CompanyInfo/CompanyInfo.tsx";
import CreditVinSection from "./ProductPageComponents/CreditVinSection/CreditVinSection.tsx";
import CarSalonDescription from "./ProductPageComponents/DescriptionInfo/CarSalonDescription.tsx";
//import CarList from "./ProductPageComponents/CarList/CarList.tsx";
import BankFinancing from "./ProductPageComponents/BankFinancing/BankFinancing.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar.tsx";

const {Content, Footer } = Layout;


const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<UserCar>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isTechDetailsVisible, setIsTechDetailsVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {

                setLoading(true);
                const response = await axios.get(`http://localhost:5174/api/Car/${id}`); // Replace with your actual API URL
                setCar(response.data);
                setLoading(false);

            } catch (err) {
                console.error('Failed to fetch car data', err);
                setError('Failed to load car data.');
                setLoading(false);
            }
        };


        if(id){
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
    }

    const carDetails = [
        { label: "Рік", value: car?.year },
        { label: "Модель", value: car?.carModel.name },
        { label: "Бренд", value: car?.carBrand.name },
        { label: "Тип кузова", value: car?.bodyType.name },
        { label: "Стадія", value: car?.stage },
        { label: "Пробіг", value: `${car?.mileage} km` },
        { label: "VIN", value: car?.vin },
        { label: "Трансмісія", value: car?.transmissionType.name },
        { label: "Кількість сидінь", value: `${car?.numberOfSeats.number} (${car?.numberOfSeats.seatType})` },
        { label: "Тип палива", value: car?.fuelTypes.name },
        { label: "Об'єм двигуна", value: `${car?.engineVolume.volume}L` },
        { label: "Тип транспорту", value: car?.transportType.name },
        { label: "Місто", value: car?.city ? car?.city.name : "Невідоме місто" },
        { label: "Колір", value: `${car?.color.color} ${car?.metallic ? "(Металік)" : ""}` },
        { label: "Ціна", value: car?.price || "Не вказано" },
        { label: "Участь в ДТП", value: car?.accidentParticipation ? "Так" : "Ні" },
        { label: "Електропакет", value: car?.hasPowerWindows ? "Так" : "Ні" },
        { label: "Кондиціонер", value: car?.hasAirConditioning ? "Так" : "Ні" },
        { label: "Шкіряний салон", value: car?.hasLeatherInterior ? "Так" : "Ні" },
        { label: "Колір преміум-салону", value: car?.hasPremiumInteriorColor ? "Так" : "Ні" },
        { label: "Підсилювач керма", value: car?.hasPowerSteering ? "Так" : "Ні" },
        { label: "Регульовані сидіння", value: car?.hasHeightAdjustableSeats ? "Так" : "Ні" },
        { label: "Фари", value: car?.hasHeadlights ? "Так" : "Ні" },
        { label: "Запасне колесо", value: car?.hasSpareWheel ? "Так" : "Ні" },
        { label: "Пам'ять сидінь", value: car?.hasSeatMemory ? "Так" : "Ні" },
        { label: "Підігрів сидінь", value: car?.hasHeatedSeats ? "Так" : "Ні" },
        { label: "Вентиляція сидінь", value: car?.hasSeatVentilation ? "Так" : "Ні" },
        { label: "Розмитнений", value: car?.isNotCustomsCleared ? "Ні" : "Так" },
        { label: "Можливість торгу", value: car?.isBargainAvailable ? "Так" : "Ні" },
        { label: "Можливість обміну", value: car?.isExchangeAvailable ? "Так" : "Ні" },
        { label: "Можливість розстрочки", value: car?.isInstallmentAvailable ? "Так" : "Ні" }
    ];

    const toggleTechDetails = () => {
        setIsTechDetailsVisible(!isTechDetailsVisible);
    };

    const searchType = 'Будь-який';
    const carType = 'Будь-який';
    const selectedBrand: string | undefined = car?.carBrand.name;
    const region = 'Будь-який';
    const year = 'Будь-який';
    const price = 'Будь-який';
    const vinChecked = false;
    const selectedModel = 'Будь-який';

    const searchRequest = {
        searchType,
        carType,
        selectedBrand ,  // Use the clicked logo's brand
        selectedModel,
        region,
        year,
        price,
        vinChecked,
    };

    async function handleClick() {
        const response = await axios.post<Car[]>('http://localhost:5174/api/Car/search', searchRequest);
        //console.log(response.data); // Обробка отриманих даних
        navigate("/search", {state: {cars: response.data, text: searchRequest}});
    }

    return (
        <Layout className="base-layout">
            <Navbar additionalClass="dark"/>
            <Content className="base-content product-container">
                <p className="path">Головна/<span>каталог</span></p>
                <div className="up-btn-container">
                    <button onClick={handleClick}><img src="/images/search-2.png" alt="Search"/>Всі пропозиції {car?.carBrand.name}</button>
                </div>
                <div className="info-container">
                    <ProductInfo car={car}/>
                    <ImageGallery car={car} />
                    <CompanyInfo car={car}/>
                    <CreditVinSection  car={car}/>
                </div>
                <div className="info-container">

                    <div className="details-btn-container">
                        <button className="details-btn" onClick={toggleTechDetails}>Всі характеристики<img src="/images/down.png" alt="down" className={isTechDetailsVisible ? 'rotated1' : 'rotated2'} /></button>
                        {isTechDetailsVisible && (
                            <div className="prod-details">
                                <p>{car?.description}</p>
                                <ul>
                                    {carDetails.map((detail, index) => (
                                        <li key={index}>
                                            {detail.label}: <span>{detail.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {!isTechDetailsVisible && (
                            <BankFinancing />
                        )}
                    </div>
                    <div>
                        <CarSalonDescription  car={car}/>

                        <div className="desc-finansing">

                            {isTechDetailsVisible && (
                                <BankFinancing />
                            )}
                        </div>
                    </div>


                </div>
                {/*<CarList/>*/}
            </Content>
            <Footer className="footer">
                <PagesFooter/>
            </Footer>
        </Layout>
    );
};

export default ProductPage;