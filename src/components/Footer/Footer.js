import React from 'react';
import footerImage from '../../assets/Footer.png';

import './Footer.css'

const Header = () => {
  return (
    <img src={footerImage} alt="Footer" className="footer-image" />
  );
};

export default Header;