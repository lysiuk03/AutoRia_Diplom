// CardList.tsx
import React from 'react';
import {digest} from "../../data/digest.ts";
import DigestCard from "../digestCard/DigestCard.tsx";

const Digest: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {digest.map((card, index) => (
                <DigestCard
                    key={index}
                    image={card.image}
                    date={card.date}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                />
            ))}
        </div>
    );
};

export default Digest;
