import React from 'react';
import "./CompanyInfo.css"

const CompanyInfo: React.FC = () => {
    return (
        <div className="box-company border">
            <div className="company">
                <img src="/images/bmw.png" alt="Company" className="company-img" />
                <div className="company-name">
                    <small>Автосалон</small>
                    <h3>Баварія Моторс</h3>
                </div>
            </div>
            <div className="row-info">
                <img src="/images/mileage.png" alt="Time" />
                <p>Працює до 16:00</p>
            </div>
            <div>
                <div className="row-info">
                    <img src="/images/geo.png" alt="Geo" />
                    <p>Харків</p>
                </div>
                <h4 className="h4-style">Працює з WheelDeal 5+ років</h4>
            </div>
            <div className="contacts-company">
                <p>(063) 358 80 70</p>
                <small>з 09:00 до 16:00 • відділ продажу</small>
            </div>
            <div className="contacts-company">
                <p>(063) 106 87 80</p>
                <small>з 09:00 до 16:00 • відділ продажу</small>
            </div>
            <button className="btn-salon">
                Написати в салон <img src="/images/chat.png" alt="Chat" />
            </button>
        </div>
    );
};

export default CompanyInfo;
