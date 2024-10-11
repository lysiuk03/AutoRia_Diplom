// React library
import React, {useEffect, useState} from 'react';

// Styles
import './ProfileCard.css';
import axios from "axios";


type ProfileCardProps = {
    name: string;
    id: string;
};

type Profile = {
    firstName: string;
    lastName: string;
    region: string;
    city: string;
    rating: number;
    phoneNumber: string;
    photo: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, id }) => {

    const [userData, setUserData] = useState<Profile>();
    let currentPhoto = userData?.photo;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5174/api/Accounts/GetUserById/${id}`);
                setUserData(response.data);
                currentPhoto = response.data.photo;
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile-card">
            <img src={`http://localhost:5174/images/1200_${currentPhoto}`} alt={name} className="profile-image"/>
            <div className="profile-details">
                <h2>{userData?.firstName + " " + userData?.lastName}</h2>
                <p>{`${userData ? userData.city : ""}, ${userData ? userData.region : ""}`}</p> {/* Display city and region */}

                {/*<p>Рейтинг: {userData ? userData.rating : 0}</p> /!* Display rating *!/*/}

                <p>Телефон: {userData ? userData.phoneNumber : "None"}</p> {/* Display phone number */}
            </div>
        </div>
    );
};

export default ProfileCard;
