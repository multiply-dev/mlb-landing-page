import React from 'react';
import './CouponModal.css';

const CouponModal = ({ prize }) => {

  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal-content">
        <h2>Coupon Code</h2>
        <p className="coupon-text">"{prize}"</p>
      </div>
    </div>
  );
};

export default CouponModal;
