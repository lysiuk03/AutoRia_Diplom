import React from 'react';
import './DigestCard.css';

interface CardProps {
    image: string;
    date: string;
    title: string;
    description: string;
}

const DigestCard: React.FC<CardProps> = ({ image, date, title, description }) => {
    return (
        <div className="digest-card-container">
            <div>
            <img src={image} alt={title} className="card-container-img"/>
            <p><img src="/images/date.png" alt="Date" className="p-image"/>{date}</p>
                <h3>{title}</h3>
            </div>
            <div>
                <hr/>
                <div className="content-down">
                    <p><img src="/images/person.png" alt="Person" className="p-image"/>{description}</p>
                    <button className="read-btn" type="submit">Читати</button>
                </div>
            </div>
        </div>
    );
};

export default DigestCard;
