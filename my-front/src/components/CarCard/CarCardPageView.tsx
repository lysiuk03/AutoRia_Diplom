// CarCardPageView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {ICarView} from "../../interfaces/carTypes.ts";
//import './CarCardPageView.css'; // Adjust path as necessary

const CarCardPageView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<ICarView | null>(null);

    useEffect(() => {
        const fetchCarData = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:5174/api/Car/${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: ICarView = await response.json();
                    setCar(data);
                } catch (error) {
                    console.error('Error fetching car data:', error);
                }
            }
        };

        fetchCarData();
    }, [id]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="car-card" >
            <div className="car-card-image">
                <img src={"../public/images/a3fa02da9f73608e54d4ffec35b3dcda.png"}
                     alt={`${car.manufacturer} ${car.model}`}/>
            </div>
            <div className="car-card-details">
                <h3>{`${car.manufacturer} ${car.model} ${'year'}`}</h3>
                <p>{`${'transmission'} • ${(car.mileage / 100).toFixed(1)} тис. км пробіг`}</p>

                <p className="car-card-price">{`${'formattedPrice'} $`}</p>
                <hr/>
                <p className="car-card-city">{'city'}</p>
                <div className="car-card-likes">
                    <span>{'likes'}</span>
                </div>
            </div>
        </div>
    );
};

export default CarCardPageView;
