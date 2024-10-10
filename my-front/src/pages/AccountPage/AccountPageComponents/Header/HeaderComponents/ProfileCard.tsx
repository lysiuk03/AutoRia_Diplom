// React library
import React from 'react';

// Styles
import './ProfileCard.css';


type ProfileCardProps = {
    name: string;
    id: string;
    imageUrl: string[];
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, id,  imageUrl }) => {


    return (
        <div className="profile-card">
            <img src={`.\\WebBack\\WebBack\\Images\\${imageUrl[0]}`} alt={name} className="profile-image" />
            <div className="profile-details">
                <h2>{name}</h2>
                <p>ID: {id}</p>
                <div className="rating">
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
