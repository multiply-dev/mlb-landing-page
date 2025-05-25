import React from 'react';
import headerImage from '../../assets/Header.png';
import logo from '../../assets/Logo.png';

import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="https://www.hi-chew.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
      <div className="header-image-container">
        <img src={headerImage} alt="Header" className="header-image" />
      </div>
    </header>
  );
};

export default Header;