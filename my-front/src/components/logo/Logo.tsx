// Libraries
import React from 'react';

// Styles
import './Logo.css';
import {Link} from "react-router-dom";

interface LogoProps {
   left?: boolean;
}

const Logo: React.FC<LogoProps> = ({ left = false}) => {
    const logoSrc = '/images/logo-light.png';
    const logoClass = left ? 'logo-image left' : 'logo-image';

    return (
        <Link to="/">
        <img
            src={logoSrc}
            alt="Logo"
            className={logoClass}
        />
        </Link>
    );
};

export default Logo;
