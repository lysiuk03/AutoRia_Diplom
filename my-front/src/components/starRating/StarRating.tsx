// src/components/StarRating.tsx

import React from 'react';

export const renderStars = (rating: number) => {
    const scaledRating = Math.round(rating / 2);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= scaledRating;
        const starImage = isFilled ? 'bluestar.png' : 'star.png';
        stars.push(
            <img
                key={i}
                src={`/images/${starImage}`}
                alt={isFilled ? 'Filled Star' : 'Empty Star'}
                className="star"
            />
        );
    }
    return stars;
};
