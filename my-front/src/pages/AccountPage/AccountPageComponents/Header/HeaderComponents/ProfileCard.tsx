// React library
import React from 'react';

// Styles
import './ProfileCard.css';
import {renderStars} from "../../../../../components/starRating/StarRating.tsx";


type ProfileCardProps = {
    name: string;
    id: string;
    phoneNumber: string;
    rating: number;
    imageUrl: string[];
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, id, phoneNumber, rating, imageUrl }) => {


    return (
        <div className="profile-card">
            <img src={imageUrl[0]} alt={name} className="profile-image" />
            <div className="profile-details">
                <h2>{name}</h2>
                <p>ID: {id} • {phoneNumber}</p>
                <div className="rating">
                    {renderStars(rating)}
                    <p>{rating}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
