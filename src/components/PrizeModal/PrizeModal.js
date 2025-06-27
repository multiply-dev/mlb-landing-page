import './PrizeModal.css';
import { useState, useEffect } from 'react';

const prizeTexts = {
  '10% Off': "your next order on Hi-Chew.com!",
  'Bucket of HI-CHEW': '',
  'HI-CHEW Keychain': '',
  '20% Off': "your next order on Hi-Chew.com!",
  'HI-CHEW Stick': '',
  '15% Off': "your next order on Hi-Chew.com!",
  'Stadium Tickets': ''
};

const PrizeModal = ({ prize, prizeColor, onClaim }) => {
  
  const [prizeText, setPrizeText] = useState("");
  // Save state to localStorage
  useEffect(() => {
    if (prize) {
      setPrizeText(prizeTexts[prize])
    }
  }, [prize]);

  return (
    <div className="prize-modal-overlay">
      <div className={`prize-modal-content ${prizeColor}`}>
        <div>
          <h1 className="prize-text">{prize}</h1>
          <h3 className="prize-subtext">{prizeText} </h3>
        </div>
        <button className="claim-button" onClick={onClaim}>
          Claim Your Prize
        </button>
      </div>
    </div>
  );
};

export default PrizeModal;
