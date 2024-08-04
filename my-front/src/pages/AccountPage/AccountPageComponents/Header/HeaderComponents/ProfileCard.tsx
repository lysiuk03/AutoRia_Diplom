// React library
import React from 'react';

// Styles
import './ProfileCard.css';


type ProfileCardProps = {
    name: string;
    id: number;
    location: string;
    rating: number;
    imageUrl: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, id, location, rating, imageUrl }) => {
    const renderStars = (rating: number) => {
        const scaledRating = Math.round(rating / 2);
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= scaledRating;
            const starImage = isFilled ? 'yellstar.png' : 'star.png';
            stars.push(
                <img
                    key={i}
                    src={`/images/${starImage}`}
                    alt={isFilled ? 'Filled Star' : 'Empty Star'}
                    className="star"
                />
            );
        }
        return stars;
    };

    return (
        <div className="profile-card">
            <img src={imageUrl} alt={name} className="profile-image" />
            <div className="profile-details">
                <h2>{name}</h2>
                <p>ID: {id} • {location}</p>
                <div className="rating">
                    <p >{rating}</p >
                    {renderStars(rating)}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
