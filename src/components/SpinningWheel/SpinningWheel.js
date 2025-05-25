import React, { useState } from 'react';
import './SpinningWheel.css';
import wheelImage from '../../assets/Wheel.gif';
import pointerImage from '../../assets/Wheel-Pointer.png';
import centerImage from '../../assets/Wheel-Middle.png';

const prizes = [
  '10% Off',
  'Bucket of HI-CHEW',
  'HI-CHEW Keychain',
  '20% Off',
  'HI-CHEW Stick',
  '15% Off',
  'Tickets'
];

const SpinningWheel = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const selectedPrizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;

    const extraSpins = 5;
    const finalAngle =
      360 * extraSpins +
      (360 - selectedPrizeIndex * segmentAngle) -
      segmentAngle / 2;

    setRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(prizes[selectedPrizeIndex]);
    }, 4000); // match CSS animation duration
  };

  return (
    <div className="wheel-wrapper">
      <img
        src={wheelImage}
        alt="Prize Wheel"
        className={`wheel-image ${isSpinning ? 'spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <img src={pointerImage} alt="Pointer" className="wheel-pointer" />
      <img src={centerImage} alt="Wheel Center" className="wheel-center" />
      <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
};

export default SpinningWheel;
