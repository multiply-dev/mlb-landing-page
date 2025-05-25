import React from 'react';
import './PrizeModal.css';

const PrizeModal = ({ prize, onClaim }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>You Won:</h2>
        <p className="prize-text">"{prize}"</p>
        <button className="claim-button" onClick={onClaim}>
          Claim Your Prize
        </button>
      </div>
    </div>
  );
};

export default PrizeModal;
