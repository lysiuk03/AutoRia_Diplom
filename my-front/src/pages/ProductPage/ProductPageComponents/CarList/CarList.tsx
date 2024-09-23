import React from 'react';
import {Car} from "../../../../interfaces/Car";
import CarCard from "../../../../components/carCard/CarCard.tsx";
import "./CarList.css"

const cars: Car[] = [
    {
        year: 2021,
        model: 'Sportage',
        manufacturer: 'Kia',
        mileage: 67000,
        vin: '123456789ABCDEFG',
        stage: 'Used',
        description: 'I Покоління 77.4 kWh (585 к.с.) AWD GT-Line',
        photos: ['/images/defcar.png'],
        transmissionType: 'Автомат',
        numberOfSeats: 5,
        fuelTypes: 'Petrol',
        engineVolume: 2.0,
        city: 'Тернопіль',
        price: 20950,
        color: 'Black',
        metallic: false,
        accidentParticipation: false,
    },
    {
        year: 2020,
        model: 'Sportage',
        manufacturer: 'Kia',
        mileage: 67000,
        vin: '123456789ABCDEFG',
        stage: 'Used',
        description: 'I Покоління 77.4 kWh (585 к.с.) AWD GT-Line',
        photos: ['/images/defcar.png'],
        transmissionType: 'Автомат',
        numberOfSeats: 5,
        fuelTypes: 'Petrol',
        engineVolume: 2.0,
        city: 'Тернопіль',
        price: 20950,
        color: 'Black',
        metallic: false,
        accidentParticipation: false,
    },
    {
        year: 2018,
        model: 'Sportage',
        manufacturer: 'Kia',
        mileage: 67000,
        vin: '123456789ABCDEFG',
        stage: 'Used',
        description: 'I Покоління 77.4 kWh (585 к.с.) AWD GT-Line',
        photos: ['/images/defcar.png'],
        transmissionType: 'Автомат',
        numberOfSeats: 5,
        fuelTypes: 'Petrol',
        engineVolume: 2.0,
        city: 'Тернопіль',
        price: 20950,
        color: 'Black',
        metallic: false,
        accidentParticipation: false,
    },{
        year: 2017,
        model: 'Sportage',
        manufacturer: 'Kia',
        mileage: 67000,
        vin: '123456789ABCDEFG',
        stage: 'Used',
        description: 'I Покоління 77.4 kWh (585 к.с.) AWD GT-Line',
        photos: ['/images/defcar.png'],
        transmissionType: 'Автомат',
        numberOfSeats: 5,
        fuelTypes: 'Petrol',
        engineVolume: 2.0,
        city: 'Тернопіль',
        price: 20950,
        color: 'Black',
        metallic: false,
        accidentParticipation: false,
    }
];

const CarList: React.FC = () => {
    return (
        <>
        <p className="name-section-cars">З цим авто також переглядають:</p>
        <div className="car-list">
            {cars.map((car, index) => (
                <CarCard key={index} {...car} />
            ))}
        </div>
        </>
    );
}

export default CarList;
