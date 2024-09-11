// Libraries
import React from 'react';

// Data
import { digest } from "../../../../../../data/digest";

// Components
import DigestCard from "../../../../../../components/digestCard/DigestCard";

// Styles
import './Digest.css';

const Digest: React.FC = () => {
    // Function to get random cards
    const getRandomCards = (array: any[], count: number): any[] => {
        if (!Array.isArray(array)) {
            console.error('Provided digest is not an array');
            return [];
        }

        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomCards = getRandomCards(digest, 3);

    return (
        <div className="container">
            {randomCards.map((card, index) => (
                <DigestCard
                    key={index}
                    image={card.image}
                    date={card.date}
                    title={card.title}
                    description={card.description}
                />
            ))}
        </div>
    );
};

export default Digest;