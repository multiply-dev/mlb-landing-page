import React, { useState } from 'react';
import jsonp from 'jsonp';
import './ChewCrew.css';


const ChewCrew = ({ onSignupComplete, prize }) => {

  console.log('rpize: ', prize)

  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  const couponCode = prize;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    jsonp(
      `${MailchimpURL}&FNAME=${fname}&LNAME=${lname}&EMAIL=${email}&FLAVOR=${flavor}`,
      { param: 'c' },
      (err, data) => {
        setIsSubmitting(false);
        if (err) {
          setError('An error occurred. Please try again.');
        } else {
          setSignedUp(true);
          onSignupComplete();
        }
      }
    );
  };

  return (
    <div className="chew-crew-container">
      {!signedUp ? (
        <>
          <h1 className='title-text'>
            <span className="dessert-mix">Chew Crew</span>
            <br />
            Signup Form
          </h1>
          <h1 className='desc-text'>One last thing...</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form
            id="mc-embedded-subscribe-form"
            className="form-container"
            name="mc-embedded-subscribe-form"
            onSubmit={handleSubmit}
          >
            <div className="questions-container">
              <div className="sign-up-text">Sign up for our Chew-Crew newsletter<sup>*</sup></div>
              <input id="mce-FNAME" name="FNAME" type="text" value={fname} onChange={(e) => setFName(e.target.value)} placeholder="First Name" required />
              <input id="mce-LNAME" name="LNAME" type="text" value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" required />
              <input id="mce-EMAIL" name="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
              <input id="mce-FLAVOR" name="FLAVOR" type="text" value={flavor} onChange={(e) => setFlavor(e.target.value)} placeholder="Favorite Flavor" required />
            </div>
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'See Results'}
            </button>
          </form>
          <p className="disclaimer-text">
            <em>*Subscribers will receive updates on new flavor launches, promotional deals, upcoming events, etc.</em>
          </p>
        </>
      ) : (
        <div className="coupon-section">
          <h2> Here’s your coupon code: <strong>{couponCode}</strong></h2>
        </div>
      )}
    </div>
  );
};

export default ChewCrew;
