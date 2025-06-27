
import './Header.css'

const Header = () => {
  return (
    <header className="header">
        <div className="header-text"> 
          <h1 className='header-title-text'>
            {/* <img src={mlblogo} alt="MLB Logo" className="mlb-logo" /> */}
            <br />
            <span className="step-up-text">Step up to <br /> the plate</span>
            <br />
            <span className="with-hichew-text">with Hi-Chew<sup>®</sup></span>
          </h1>
          <p>Now it's time to swing for the fences — grab your bat (or your finger) 
            and take your best shot! <br /> Spin the prize wheel to unlock your 
            grand prize.
          </p>
        </div>
    </header>
  );
};

export default Header;