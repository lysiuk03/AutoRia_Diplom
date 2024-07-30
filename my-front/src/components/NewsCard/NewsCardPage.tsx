// NewsCard.tsx
import React from 'react';
import './NewsCard.css';

interface NewsCardProps {
    imageUrl: string;
    date: string;
    title: string;
    source: string;
}

const NewsCardPage: React.FC<NewsCardProps> = ({
                                               imageUrl,
                                               date,
                                               title,
                                               source
                                           }) => {
    return (
        <div className="news-card">


            <div className="news-card-content">
                <div className="news-card-image">
                    <img src={imageUrl} alt={title}/>
                </div>

                <div className="news-card-date">
                    <i className="calendar-icon"/> {date}
                </div>
                <h3 className="news-card-title">{title}</h3>
                <div className="news-card-footer">
                    <div className="news-card-source">
                        <i className="source-icon"/> {source}
                    </div>
                    <button className="news-card-button">Читати</button>
                </div>
            </div>
        </div>
    );
};

export default NewsCardPage;
