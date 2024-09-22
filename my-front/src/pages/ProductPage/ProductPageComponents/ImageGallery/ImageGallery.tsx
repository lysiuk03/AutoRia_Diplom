import React, { useState } from 'react';
import "./ImageGallery.css"

const images = [
    '/images/men.png',
    '/images/car-2.png',
    '/images/defcar.png',
    '/images/road.png'
];

const ImageGallery: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="photo">
            <div className="main-photo">
                <button className="arrow left" onClick={prevImage}>
                    <img src="/images/left-white.png" alt="Left" />
                </button>
                <img src={images[currentIndex]} alt="Car" />
                <button className="arrow right" onClick={nextImage}>
                    <img src="/images/right.png" alt="Right" />
                </button>
            </div>
            <div className="thumbnail-gallery">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
