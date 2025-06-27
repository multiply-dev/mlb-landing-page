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
  'Stadium Tickets'
];

const SPIN_DURATION = 6000; // 6s total spin

const SpinningWheel = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const extraSpins = 10; // full revolutions

    try {
      // Start API call and wheel spin *at the same time*
      const fetchPrize = fetch('https://script.google.com/macros/s/AKfycbz8xPoD4Y3EY1w0wW17l_FNh3cQ7xjEO1Wxnv-GgAKQ4Duj5ZCGbW2HQymRdYly5il7HA/exec?action=getPrize')
        .then((res) => res.json());

      // Dummy spin angle for now (we'll update it below)
      const tempFinalAngle = rotation + 360 * extraSpins;
      setRotation(tempFinalAngle);

      const data = await fetchPrize;

      const selectedPrize = data.prize;
      const coupon = data.coupon;

      if (!selectedPrize) throw new Error("No prize available.");

      const selectedPrizeIndex = prizes.indexOf(selectedPrize);
      const segmentAngle = 360 / prizes.length;
      const offset = segmentAngle / 2;
      const targetAngle = 360 - selectedPrizeIndex * segmentAngle - offset;

      // Update final rotation: preserve extra spins but adjust to land on prize
      const newRotation = rotation + 360 * extraSpins + (targetAngle - (rotation % 360) + 360) % 360;
      setRotation(newRotation);

      // Trigger callback after spin completes
      setTimeout(() => {
        setIsSpinning(false);
        onSpinComplete(selectedPrize);
        localStorage.setItem('couponCode', coupon);
      }, SPIN_DURATION);
    } catch (error) {
      console.error("Error fetching prize:", error);
      setIsSpinning(false);
    }
  };

  return (
    <div className="wheel-wrapper">
      <img
        src={wheelImage}
        alt="Prize Wheel"
        className="wheel-image"
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
