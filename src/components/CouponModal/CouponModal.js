import React from 'react';
import './CouponModal.css';

const CouponModal = ({ prize }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Coupon Code</h2>
        <p className="prize-text">"{prize}"</p>
      </div>
    </div>
  );
};

export default CouponModal;
