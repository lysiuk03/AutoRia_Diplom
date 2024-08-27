// Libraries
import React from 'react';

// Data
import { digest } from "../../../../../../data/digest";

// Components
import DigestCard from "../../../../../../components/digestCard/DigestCard";

// Styles
import './Digest.css';


const Digest: React.FC = () => {
    return (
        <div className="container">
            {digest.map((card, index) => (
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
