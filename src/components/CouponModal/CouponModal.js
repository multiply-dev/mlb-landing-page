import React from 'react';
import './CouponModal.css';

const CouponModal = ({ prize }) => {

  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal-content">
          <div>
            <h1 className="coupon-text">Coupon Code:</h1>
            <h3 className="coupon-subtext">[insert-coupon-name]</h3>
          </div>
          <div>
            <h3>Visit <a href="https://www.hi-chew.com/" className="hi-chew-link" target="_blank" rel="noreferrer">HI-CHEW<sup>®</sup></a> and use this code at checkout</h3>
          </div>
        </div>
    </div>
  );
};

export default CouponModal;
