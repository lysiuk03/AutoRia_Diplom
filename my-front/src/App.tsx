import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainSearchPage from "./pages/MainSearchPage/MainSearchPage.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSearchPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
