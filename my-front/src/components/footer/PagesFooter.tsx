// Libraries
import React from 'react';

// Styles
import './PagesFooter.css';


const PagesFooter: React.FC = () => (

            <div className="box-gray">
                <div className="footer-sections">
                    <div className="footer-section">
                        <h4 className="main-menu">Каталог</h4>
                        <ul>
                            <li><a href="#">Вживані авто</a></li>
                            <li><a href="#">Нові авто</a></li>
                            <li><a href="#">Спецтехніка</a></li>
                        </ul>
                        <h4 className="main-menu">Відгуки</h4>
                    </div>
                    <div className="footer-section">
                        <h4 className="main-menu">Новини</h4>
                        <ul>
                            <li><a href="#">Тест-драйви</a></li>
                            <li><a href="#">Електромобілі</a></li>
                            <li><a href="#">Розмитнення</a></li>
                            <li><a href="#">Онлайн-журнал</a></li>
                            <li><a href="#">Як підготувати авто до зими?</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4 className="main-menu">Компанія</h4>
                        <ul>
                            <li><a href="#">Хто ми?</a></li>
                            <li><a href="#">Контакти</a></li>
                        </ul>
                        <h4 className="main-menu">Сервіси</h4>
                        <h4 className="main-menu">Послуги для авто</h4>
                    </div>
                    <div className="footer-section">
                        <button className="footer-button">Написати нам</button>
                        <div className="social-media-container">
                            <a href="#"><img src="/images/viber.png" alt="Viber" className="social-icon"/></a>
                            <a href="#"><img src="/images/telegram.png" alt="Telegram" className="social-icon"/></a>
                            <a href="#"><img src="/images/instagram.png" alt="Instagram" className="social-icon"/></a>
                            <a href="#"><img src="/images/facebook.png" alt="Facebook" className="social-icon"/></a>
                        </div>
                    </div>
                </div>
                <div className="contacts-container">
                    <div className="phone-container">
                        <h4 className="phone">+380-98-449-71-31</h4>
                    </div>
                    <div className="phone-container">
                        <h4 className="phone">+380-66-446-61-41</h4>
                    </div>
                </div>
            </div>
    )
;

export default PagesFooter;
