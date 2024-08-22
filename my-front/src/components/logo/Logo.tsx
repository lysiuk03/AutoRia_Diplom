// Libraries
import React from 'react';

// Styles
import './Logo.css';
import {Link} from "react-router-dom";

interface LogoProps {
    dark?: boolean;
    left?: boolean;
}

const Logo: React.FC<LogoProps> = ({ dark = false, left = false }) => {
    const logoSrc = dark ? '/images/logo-dark.png' : '/images/logo-light.png';
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