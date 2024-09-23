// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './HomeNews.css';

// Data
import { digest } from '../../../../data/digest';

// Components
import DigestCard from '../../../../components/digestCard/DigestCard';



const HomeNews: React.FC = () => {
    const isActive = (path: string) => location.pathname === path;

    interface MenuItem {
        key: string;
        label: string;
        path: string;
    }
    const menuItems: MenuItem[] = [
        { key: '1', label: 'Автоновини', path: '/news' },
        { key: '2', label: 'Тест-драйв', path: '' },
        { key: '3', label: 'Електромобілі', path: '' },
        { key: '4', label: 'Розмитнення', path: '' },
        { key: '5', label: 'Онлайн-журнал', path: '' },
        { key: '6', label: 'Розмитнення', path: '' },
    ];

    return (
        <div className='home-news-container'>
            <p className="news-link">WheelDeal.ua/<span>Новини</span></p>
            <nav className="news-menu">
                {menuItems.map(item => (
                    <div key={item.key} className={`menu-item ${isActive(item.path) ? 'active' : ''}`}>
                        <Link to={item.path}>{item.label}</Link>
                    </div>
                ))}
            </nav>
            <div className='grid-news-container'>
                {digest.map((card, index) => (
                    <DigestCard
                        key={index}
                        image={card.image[0]}
                        date={card.date}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>

        </div>
    );
};

export default HomeNews;