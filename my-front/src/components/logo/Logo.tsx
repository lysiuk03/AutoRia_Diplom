// Libraries
import React from 'react';

// Styles
import './Logo.css';

interface LogoProps {
    dark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ dark = false}) => {
    const logoSrc = dark ? '/images/logo-dark.png' : '/images/logo-light.png';
    const logoClass = dark ? 'logo-image dark' : 'logo-image';

    return (
        <img
            src={logoSrc}
            alt="Logo"
            className={logoClass}
        />
    );
};

export default Logo;
