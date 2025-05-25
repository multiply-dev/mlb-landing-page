import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChewCrew from './components/ChewCrew/ChewCrew';
import SpinningWheel from './components/SpinningWheel/SpinningWheel';
import PrizeModal from './components/PrizeModal/PrizeModal';
import CouponModal from './components/CouponModal/CouponModal';

import './App.css';


const App = () => {
  const [hasSpun, setHasSpun] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSpinComplete = (selectedPrize) => {
    setHasSpun(true);
    setPrize(selectedPrize);
    setShowModal(true);
  };

  const handleClaimPrize = () => {
    setShowModal(false); // Hide modal
  };


  const handleSignupComplete = () => {
    setIsSignedUp(true);
  };

  return (
    <div className="container">
      <Header />

      {!showModal && !hasSpun && !isSignedUp && (
        <SpinningWheel onSpinComplete={handleSpinComplete} />
      )}
      
      {showModal && prize && (
        <PrizeModal prize={prize} onClaim={handleClaimPrize} />
      )}

      {!showModal && hasSpun && !isSignedUp && (
        <ChewCrew prize={prize} onSignupComplete={handleSignupComplete} />
      )}

      {/* hasSpun && isSignedUp saved in localstorage? */}
      {isSignedUp && (
        <CouponModal prize={prize} />
      )}

      <Footer />
    </div>
  );
};

export default App;
