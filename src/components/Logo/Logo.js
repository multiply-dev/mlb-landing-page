import logo from '../../assets/Logo.png';

import './Logo.css'

const Logo = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="https://www.hi-chew.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
    </header>
  );
};

export default Logo;