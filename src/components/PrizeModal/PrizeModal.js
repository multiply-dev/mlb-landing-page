import './PrizeModal.css';

const PrizeModal = ({ prize, prizeColor, onClaim }) => {
  
  return (
    <div className="prize-modal-overlay">
      <div className={`prize-modal-content ${prizeColor}`}>
        <div>
          <h1 className="prize-text">{prize}</h1>
          <h3 className="prize-subtext">YOUR NEXT HI-CHEW ORDER!</h3>
        </div>
        <button className="claim-button" onClick={onClaim}>
          Claim Your Prize
        </button>
      </div>
    </div>
  );
};

export default PrizeModal;
