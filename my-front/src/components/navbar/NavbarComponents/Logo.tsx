// Libraries
import React from 'react';
import { Link } from "react-router-dom";


interface LogoProps {
  isDarkMode: boolean; 
}

const Logo: React.FC<LogoProps> = ({ isDarkMode }) => {
  const logoSrc = isDarkMode ? '/images/logo-dark.png' : '/images/logo-light.png'; 

  return (
    <Link to="/">
      <img
        src={logoSrc}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;