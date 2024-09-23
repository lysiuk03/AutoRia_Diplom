// Libraries
import React, { useState } from 'react';

// Styles
import './Reviews.css';

// Data
import { reviews } from "../../../../../../data/reviews.ts";


const Reviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const { name, text, rating, image } = reviews[currentIndex];

    return (
        <div className="review-container">
            <button onClick={prevReview} className="arrow-button">
                <img src="/images/left-white.png" alt="Left"/>
            </button>
            <div className="review-content">
                <div className="review">
                    <div>
                        <div className="review-image-wrapper">
                            <img src={image[0]} alt={name} className="review-image"/>
                        </div>
                        <h3>{name}</h3>
                        <p>{Array.from({length: rating}, (_, index) => (
                            <img key={index} src="/images/star.png" alt="Star" className="star-image"/>
                        ))}</p>

                    </div>
                    <p>{text}</p>
                </div>
            </div>
            <button onClick={nextReview} className="arrow-button">
                <img src="/images/right.png" alt="Right"/>
            </button>
        </div>
    );
};

export default Reviews;
