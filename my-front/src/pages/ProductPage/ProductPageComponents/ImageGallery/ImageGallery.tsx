import React, { useState } from 'react';
import './ImageGallery.css';
import { ProductInfoProps } from '../../../../interfaces/Car';

const ImageGallery: React.FC<ProductInfoProps> = ({ car }) => {
    if (!car) {
        return <div>Loading...</div>;
    }

    const { photos } = car;

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const images = photos.length > 0 ? photos.map(photo => `/images/${photo.toString()}`) : [];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="photo">
            <div className="main-photo">
                <button className="arrow left" onClick={prevImage} disabled={images.length === 0}>
                    <img src="/images/left-white.png" alt="Left" />
                </button>
                {images.length > 0 ? (
                    <img src={images[currentIndex]} alt="Car" />
                ) : (
                    <p>No images available</p>
                )}
                <button className="arrow right" onClick={nextImage} disabled={images.length === 0}>
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
                        className={index === currentIndex ? 'active' : ''}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
