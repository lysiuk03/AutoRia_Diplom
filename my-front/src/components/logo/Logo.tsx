// Libraries
import React from 'react';

// Styles
import './Logo.css';
import {Link} from "react-router-dom";

interface LogoProps {
    dark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ dark = false}) => {
    const logoSrc = dark ? '/images/logo-dark.png' : '/images/logo-light.png';
    const logoClass = dark ? 'logo-image dark' : 'logo-image';

    return (
        <Link to="/home">
        <img
            src={logoSrc}
            alt="Logo"
            className={logoClass}
        />
        </Link>
    );
};

export default Logo;
