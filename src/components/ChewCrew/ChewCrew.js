import React, { useState } from 'react';
import jsonp from 'jsonp';
import Chevron from '../icons/chevron/Chevron'; // adjust the path as needed
import './ChewCrew.css';


const ChewCrew = ({ onSignupComplete, prize }) => {

  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZIP] = useState('');
  const [terms, setTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [showTermsText, setShowTermsText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const params = new URLSearchParams({
      FNAME: fname,
      LNAME: lname,
      EMAIL: email,
      ADDRESS: address,
      CITY: city,
      STATE: state,
      ZIP: zip,
      ACCEPTS: terms,
    }).toString();

    jsonp(`${MailchimpURL}&${params}`, { param: 'c' }, async (err, data) => {
      if (err || data.result === 'error') {
        setIsSubmitting(false);
        setError(data.msg || 'An error occurred. Please try again.');
      } else {
        // Submit data to Apps Script
        try {
          const coupon = localStorage.getItem('couponCode');
          await fetch(`https://script.google.com/macros/s/AKfycbz8xPoD4Y3EY1w0wW17l_FNh3cQ7xjEO1Wxnv-GgAKQ4Duj5ZCGbW2HQymRdYly5il7HA/exec?action=submitInfo&coupon=${encodeURIComponent(coupon)}&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&zip=${encodeURIComponent(zip)}`);
        } catch (e) {
          console.error("Error storing address:", e);
        }
        setIsSubmitting(false);
        onSignupComplete();
      }
    });
  };


  return (
    <div className="chew-crew-container">
          <h1 className='title-text'>
            <span className="almost-there-text">Almost there!</span>
            <br />
            Just enter your info to claim your prize:
          </h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form
            id="mc-embedded-subscribe-form"
            className="form-container"
            name="mc-embedded-subscribe-form"
            onSubmit={handleSubmit}
          >
            <div className="questions-container">
              <input id="mce-FNAME" name="FNAME" type="text" value={fname} onChange={(e) => setFName(e.target.value)} placeholder="First Name" required />
              <input id="mce-LNAME" name="LNAME" type="text" value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" required />
              <input id="mce-EMAIL" name="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
              <input id="mce-ADDRESS" name="ADDRESS" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping Address" required />
              <input id="mce-CITY" name="CITY" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
              <input id="mce-STATE" name="STATE" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
              <input id="mce-ZIP_CODE" name="ZIP_CODE" type="text" inputMode="numeric" maxLength="10" value={zip} onChange={(e) => setZIP(e.target.value)} placeholder="ZIP Code" required />
            </div>

            <div className="terms-container">
              <div className="terms-label">
                <input id="mce-TERMS" className="check" name="TERMS" type="checkbox" value={terms} onChange={(e) => setTerms(!terms)} placeholder="Terms and Conditions" required />
                <label>
                  I accept and agree to the <strong>Terms and Conditions</strong>
                </label>
                <button
                  type="button"
                  className="chevron-toggle"
                  onClick={() => setShowTermsText(!showTermsText)}
                >
                  <Chevron isopen={!showTermsText} />
                </button>
              </div>
              {showTermsText && (
                <div className="terms-details">
                  <p className="terms-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
                    convallis leo. Suspendisse potenti. Sed ac tortor elit. In hac
                    habitasse platea dictumst. Curabitur non nisi eu ligula commodo
                    accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
                    convallis leo. Suspendisse potenti. Sed ac tortor elit. In hac
                    habitasse platea dictumst. Curabitur non nisi eu ligula commodo
                    accumsan. 
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
                    convallis leo. Suspendisse potenti. Sed ac tortor elit. In hac
                    habitasse platea dictumst. Curabitur non nisi eu ligula commodo
                    accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
                    convallis leo. Suspendisse potenti. Sed ac tortor elit. In hac
                    habitasse platea dictumst. Curabitur non nisi eu ligula commodo
                    accumsan. 
                    
                  </p>
                </div>
              )}
            </div>
            
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Claim prize now'}
            </button>
          </form>
    </div>
  );
};

export default ChewCrew;
