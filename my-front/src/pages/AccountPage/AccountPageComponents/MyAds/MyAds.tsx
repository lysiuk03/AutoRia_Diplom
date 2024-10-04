// MyAds.tsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Імпортуємо useSelector
import './MyAds.css';
import CarCard from "../../../../components/carCard/CarCard";
import { Car } from "../../../../interfaces/Car"; // Інтерфейс Car для типізації
import { RootState } from '../../../../redux/store';
import { decodeJwt } from "jose";

interface DecodedToken {
    firstName?: string;
    lastName?: string;
    id?: string;
    location?: string;
    rating?: number;
    photo?: string;
}

const MyAds: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    let profileData = {
        name: 'Невідомий користувач',
        id: '0',
        location: 'Місце не вказано',
        rating: 0,
        imageUrl: ['/images/default.png'],
    };

    const token = useSelector((state: RootState) => state.auth.token);

    if (token) {
        const decodedToken = decodeJwt(token) as DecodedToken;

        profileData = {
            name: decodedToken?.firstName ? `${decodedToken.firstName} ${decodedToken.lastName}` : 'Невідомий користувач',
            id: decodedToken?.id || '0',
            location: decodedToken?.location || 'Місце не вказано',
            rating: decodedToken?.rating || 0,
            imageUrl: decodedToken?.photo ? [decodedToken.photo] : ['/images/default.png'],
        };
    }

    const userId = profileData.id;

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5174/api/Car/user/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                console.log("Response status:", response.status);
                const responseBody = await response.json();
                console.log("Response body:", responseBody);

                if (!response.ok) {
                    throw new Error(`Error fetching cars: ${response.status}`);
                }

                setCars(responseBody);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCars();
        }
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="my-ads-container">
            <div className="cars-grid">
                {cars.length === 0 ? (
                    <p>No cars found.</p>
                ) : (
                    cars.map((car: Car, index: number) => (
                        <CarCard key={index} {...car} /> // Передаємо всі властивості car
                    ))
                )}
            </div>
        </div>
    );
};

export default MyAds;
