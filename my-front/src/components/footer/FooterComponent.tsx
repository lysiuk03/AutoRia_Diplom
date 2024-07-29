import React from 'react';
import './FooterComponent.css';
import ContactForm from "../contactForm/ContactForm.tsx";


const FooterComponent: React.FC = () => (

            <div className="box-gray">
                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>КАТАЛОГ</h4>
                        <ul>
                            <li><a href="#">Вживані авто</a></li>
                            <li><a href="#">Нові авто</a></li>
                            <li><a href="#">Спецтехніка</a></li>
                        </ul>
                        <h4>ВІДГУКИ</h4>
                    </div>
                    <div className="footer-section">
                        <h4>НОВИНИ</h4>
                        <ul>
                            <li><a href="#">Тест-драйви</a></li>
                            <li><a href="#">Електромобілі</a></li>
                            <li><a href="#">Розмитнення</a></li>
                            <li><a href="#">Онлайн-журнал</a></li>
                            <li><a href="#">Як підготувати авто до зими?</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>КОМПАНІЯ</h4>
                        <ul>
                            <li><a href="#">Хто ми?</a></li>
                            <li><a href="#">Контакти</a></li>
                        </ul>
                        <h4>СЕРВІСИ</h4>
                        <h4>ПОСЛУГИ ДЛЯ АВТО</h4>
                    </div>
                </div>
                <div className="contacts-container">
                    <div className="phone-container">
                        <h4 className="phone">+380-98-449-71-31</h4>
                    </div>
                    <div className="social-media-container">
                        <a href="#"><img src="/images/viber.png" alt="Viber" className="social-icon"/></a>
                        <a href="#"><img src="/images/telegram.png" alt="Telegram" className="social-icon"/></a>
                        <a href="#"><img src="/images/instagram.png" alt="Instagram" className="social-icon"/></a>
                        <a href="#"><img src="/images/facebook.png" alt="Facebook" className="social-icon"/></a>
                    </div>
                </div>
                <ContactForm/>
            </div>
    )
;

export default FooterComponent;
