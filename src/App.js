import { useState, useEffect } from 'react';
import Logo from './components/Logo/Logo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChewCrew from './components/ChewCrew/ChewCrew';
import SpinningWheel from './components/SpinningWheel/SpinningWheel';
import PrizeModal from './components/PrizeModal/PrizeModal';
import CouponModal from './components/CouponModal/CouponModal';

import './App.css';

  const prizeColors = {
    '10% Off': 'prize-10-percent-off',
    'Bucket of HI-CHEW': 'prize-bucket-of-hi-chew',
    'HI-CHEW Keychain': 'prize-hi-chew-keychain',
    '20% Off': 'prize-20-percent-off',
    'HI-CHEW Stick': 'prize-hi-chew-stick',
    '15% Off': 'prize-15-percent-off',
    'Stadium Tickets': 'prize-tickets'
  };

const App = () => {
  const [hasSpun, setHasSpun] = useState(false);
  const [prize, setPrize] = useState(null);
  const [prizeColor, setPrizeColor] = useState("black");
  const [showModal, setShowModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);


  // Load saved state on first render
  useEffect(() => {
    const savedHasSpun = localStorage.getItem('hasSpun') === 'true';
    const savedIsSignedUp = localStorage.getItem('isSignedUp') === 'true';
    const savedPrize = localStorage.getItem('prize');

    if (savedHasSpun) setHasSpun(true);
    if (savedIsSignedUp) setIsSignedUp(true);
    if (savedPrize) setPrize(JSON.parse(savedPrize));
    if (savedPrize) setPrizeColor(prizeColors[JSON.parse(savedPrize)]);
  }, []);


  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('hasSpun', hasSpun.toString());
    localStorage.setItem('isSignedUp', isSignedUp.toString());
    if (prize) {
      localStorage.setItem('prize', JSON.stringify(prize));
      setPrizeColor(prizeColors[prize])
    }
  }, [hasSpun, isSignedUp, prize, prizeColor]);


  const handleSpinComplete = (selectedPrize) => {
    setHasSpun(true);
    setPrize(selectedPrize);
    setPrizeColor(prizeColors[selectedPrize]);
    setShowModal(true);
  };

  const handleClaimPrize = () => {
    setShowModal(false);
  };

  const handleSignupComplete = () => {
    setIsSignedUp(true);
  };

  const userIsDone = hasSpun && isSignedUp;

  return (
    <div className="container">
      <Logo />
      <div className="header-background">
        <Header />

        {/* Show CouponModal immediately if user already spun and signed up */}
        {userIsDone && (
          <CouponModal prize={prize} prizeColor={prizeColor} />
        )}

        {!userIsDone && !showModal && (
          <>
            {!hasSpun && <SpinningWheel onSpinComplete={handleSpinComplete} />}
            {hasSpun && !isSignedUp && <ChewCrew prize={prize} onSignupComplete={handleSignupComplete} />}
          </>
        )}

        {showModal && prize && (
          <PrizeModal prize={prize} prizeColor={prizeColor} onClaim={handleClaimPrize} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
