import './CouponModal.css';
import { useEffect, useState } from "react";

const CouponModal = ({ prize, prizeColor }) => {
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const getCoupon = async () => {
      if (prize) {
        try {                                                             
          const response = await fetch(`https://script.google.com/macros/s/AKfycbz8xPoD4Y3EY1w0wW17l_FNh3cQ7xjEO1Wxnv-GgAKQ4Duj5ZCGbW2HQymRdYly5il7HA/exec?prize=${encodeURIComponent(prize)}`);
          const data = await response.json();
          setCoupon(data.coupon || "No coupon available");
        } catch (error) {
          console.error("Error fetching coupon:", error);
          setCoupon("Error retrieving coupon");
        }
      }
    };

    getCoupon();
  }, [prize]);

  return (
    <div className="coupon-modal-overlay">
      <div className={`coupon-modal-content ${prizeColor}`}>
        <div>
          <h1 className="coupon-text">Coupon Code:</h1>
          <h3 className="coupon-subtext">{coupon}</h3>
        </div>
        <div>
          <h3>
            Visit <a href="https://www.hi-chew.com/" className="hi-chew-link" target="_blank" rel="noreferrer">HI-CHEW<sup>®</sup></a> and use this code at checkout
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;

