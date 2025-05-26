import React, { useState } from 'react';
import jsonp from 'jsonp';
import Chevron from '../icons/chevron/Chevron'; // adjust the path as needed
import './ChewCrew.css';


const ChewCrew = ({ onSignupComplete, prize }) => {

  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [terms, setTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [showTermsText, setShowTermsText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    jsonp(
      `${MailchimpURL}&FNAME=${fname}&LNAME=${lname}&EMAIL=${email}&FLAVOR=${flavor}&accepts_marketing=${terms}`,
      { param: 'c' },
      (err, data) => {
        setIsSubmitting(false);
        if (err) {
          setError('An error occurred. Please try again.');
        } else {
          onSignupComplete();
        }
      }
    );
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
              <input id="mce-FLAVOR" name="FLAVOR" type="text" value={flavor} onChange={(e) => setFlavor(e.target.value)} placeholder="Favorite Flavor" required />
            </div>

            <div className="terms-container">
              <div><input id="mce-TERMS" className="checkbox" name="TERMS" type="checkbox" value={terms} onChange={(e) => setTerms(!terms)} placeholder="Terms and Conditions" required />
              <label className="terms-label">
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
