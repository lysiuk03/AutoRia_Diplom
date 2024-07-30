import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";

import CarCardListPage from "./components/CarCardList/CarCardListPage.tsx";
import CarCardPageView from "./components/CarCard/CarCardPageView.tsx";
import SellCarForm from "./components/SellCarForm/SellCarForm.tsx";

const App: React.FC = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}>

                </Route>
                <Route path="/sell" element={<SellCarForm />}/>
                <Route path="/carlist" element={<CarCardListPage />} />
                <Route path="/carlist/:id" element={<CarCardPageView/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
