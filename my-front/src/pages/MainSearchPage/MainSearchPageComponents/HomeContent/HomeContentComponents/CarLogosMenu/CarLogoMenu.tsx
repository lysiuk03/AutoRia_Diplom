// Libraries
import React from 'react';

// Styles
import './CarLogoMenu.css';


const logos = [
    { name: 'Volkswagen', src: './images/carslogos/volkswagen.png' },
    { name: 'BMW', src: './images/carslogos/bmw.png' },
    { name: 'Mercedes-Benz', src: './images/carslogos/mercedes.png' },
    { name: 'Porshe', src: './images/carslogos/porsche.png' },
    { name: 'Lexus', src: './images/carslogos/lexus.png' },
    { name: 'Infiniti', src: './images/carslogos/infiniti.png' },
    { name: 'Suzuki', src: './images/carslogos/suzuki.png' },
    { name: 'Ford', src: './images/carslogos/ford.png' },
    { name: 'Mazda', src: './images/carslogos/mazda.png' },
    { name: 'Toyota', src: './images/carslogos/toyota.png' },
    { name: 'Fiat', src: './images/carslogos/fiat.png' },
    { name: 'Kia', src: './images/carslogos/kia.png' },
    { name: 'Nissan', src: './images/carslogos/nissan.png' },
    { name: 'MINI', src: './images/carslogos/mini.png' },
    { name: 'Renault', src: './images/carslogos/renault.png' },
    { name: 'Peugeot', src: './images/carslogos/peugeot.png' },
    { name: 'Audi', src: './images/carslogos/audi.png' },
    { name: 'Citroen', src: './images/carslogos/citroen.png' },
];

const CarLogoMenu: React.FC = () => {
    const handleClick = (name: string) => {
        alert(`You clicked on ${name}`);
    };

    const handleButtonClick = () => {
        alert('You clicked the button!');
    };

    return (
        <div className="logo-menu">
            {logos.map((logo) => (
                <div
                    key={logo.name}
                    className="logo-item"
                    onClick={() => handleClick(logo.name)}
                >
                    <img src={logo.src} alt={logo.name} />
                    <span>{logo.name}</span>
                </div>
            ))}
            <button className="more-button" onClick={handleButtonClick}>Більше</button>
        </div>
    );
};

export default CarLogoMenu;
