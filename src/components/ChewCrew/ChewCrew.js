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
          await fetch(`https://script.google.com/macros/s/AKfycbz8xPoD4Y3EY1w0wW17l_FNh3cQ7xjEO1Wxnv-GgAKQ4Duj5ZCGbW2HQymRdYly5il7HA/exec?action=submitInfo&coupon=${encodeURIComponent(coupon)}&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&email=${encodeURIComponent(email)}&zip=${encodeURIComponent(zip)}`);
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
                <div className="terms-scrollbox">
                <div className="terms-details">
                    <p className="terms-text">
                      <i>HI-CHEW Spin To Win Giveaway</i>
                      <br /><br />
                      <b>OFFICIAL RULES</b>
                      <br /><br />
                      <b>NO PURCHASE OR PAYMENT OF MONEY IS NECESSARY TO ENTER OR WIN THIS SWEEPSTAKES. A PURCHASE OR PAYMENT OF MONEY WILL NOT IMPROVE THE CHANCES OF WINNING.</b>
                      <br /><br />
                      The <i>HI-CHEW Spin To Win</i> (the “Sweepstakes”) is intended for legal residents of the United States of America (“USA”) and shall only be construed and evaluated according to applicable USA law and applicable state law. Do not enter this Sweepstakes if you are not a
  USA resident or are otherwise ineligible to enter in accordance with these Official Rules at the time of entry. The Sweepstakes is sponsored by Morinaga America, Inc., 4 Park Plaza, Ste 750, Irvine, CA 92614 (the “Sponsor”).
                      <br /><br />
                      <b>ELIGIBILITY</b>: The Sweepstakes is open to legal residents of the USA (who are at least eighteen (18) years of age or the age of majority, whichever is older, in their respective states of permanent residence at the time of entry (the “Entrants”). The Sponsor, HI-CHEW USA (the “Administrator”), Morinaga America, Inc., and their respective parent companies, employees, officers, directors, subsidiaries, affiliates, distributors, sales representatives and advertising and promotional agencies, and the officers, directors, agents, and employees of each of the foregoing (collectively, the “Released Parties”), and members of their immediate families (defined as including spouse, biological, adoptive and step-parents, grandparents, siblings, children and grandchildren, and each of their respective spouses, regardless of where they reside) or households (whether related or not) of any of the above are NOT eligible to participate in this Sweepstakes. Non-eligibility or non compliance with any of these Official Rules will result in disqualification. <b>Void in Puerto Rico, U.S. territories, and where prohibited or restricted by law.</b> (For the avoidance of doubt, any references in these Rules to Entrants shall also include the Entrant who is deemed the Winner (as defined below)).
                      <br /><br />
                      <b>AGREEMENT TO OFFICIAL RULES</b>: By participating, Entrants agree to abide by and be bound by these Official Rules and the decisions of the Sponsor, which are final and binding in all matters relating to the Sweepstakes. Winning the Prize (as defined below) is contingent upon fulfilling all requirements set forth herein.
                      <br /><br />
                      <b>HOW TO WIN</b>: The Sweepstakes begins at 12:00:01 a.m. EST on July 14, 2025 and ends at 11:59:59 p.m. EST on September 28, 2025 (“Sweepstakes Period”). The Sponsor’s database computer is the official time-keeping device for the Sweepstakes. 
                      <br /><br />
                      <b>1. Online</b> – During the Sweepstakes Period, Entrants who scan the HI-CHEW provided QR code at participating MLB stadiums will be directed to Sponsor’s website to spin the prize wheel, https://www.hi-chew.com/pages/spin-to-win (the “Website”). At the Website, Entrants will be required to complete the Sweepstakes registration form requesting full name, complete mailing address, phone number, and email address. By completing the registration form an Entrant will receive one (1) Sweepstakes prize win.
                      <br /><br />
                      LIMIT ONE (1) WIN PER ENTRANT, REGARDLESS OF METHOD OF ENTRY. Proof of entry information at the Website is not considered proof of delivery to or receipt by Sponsor of an entry. Entries made by any other individual or any entity, and/or originating at any other website or email address, including, but not limited to, commercial Sweepstakes subscription notification and/or entering service sites, will be declared invalid and disqualified for this Sweepstakes. The use of automated entry devices is prohibited, and no mechanically reproduced entries are allowed; all such entries are void. The Released Parties are not responsible for: late, incomplete, delayed, undelivered, or misdirected entries. All entries become the exclusive property of Sponsor and will not be acknowledged or returned. By participating, Entrants consent for Sponsor to obtain, use, and transfer your name, address and other information for the sole purpose of administering this Sweepstakes. By participating, Entrants consent to Sponsor’s and its agents’ use of your personal information for the administration of this Sweepstakes, or in any other manner consistent with Sponsor’s Privacy Policy, available at https://morinaga-america.com/privacy-policy/.
                      <br /><br />
                      <b>GENERAL CONDITIONS</b>: If for any reason the operation or administration of this Sweepstakes is impaired or incapable of running as planned for any reason, including but not limited to (i) infection by computer virus, bugs, (ii) tampering, unauthorized intervention, (iii) fraud, (iv) technical failures, or (v) any other causes beyond the control of the Sponsor which corrupt or affect the administration, security, fairness, integrity or proper conduct of this Sweepstakes, the Sponsor reserves the right at its sole discretion, to disqualify any individual who tampers with the entry process, and to cancel, terminate, modify or suspend the Sweepstakes in whole or in part, at any time, without notice and award the Prize (defined below) using all non-suspect eligible entries received as of, or after (if applicable) this cancellation, termination, modification or suspension date, or in any manner that is fair and equitable and best conforms to the spirit of these Official Rules. Sponsor reserves the right, at its sole discretion, to disqualify any individual deemed to be tampering or attempting to tamper with the entry process or the operation of the Sweepstakes or Sponsor’s Website; or acting in violation of these Official Rules or in an unsportsmanlike or disruptive manner. CAUTION: ANY ATTEMPT TO DELIBERATELY DAMAGE ANY WEBSITE OR UNDERMINE THE LEGITIMATE OPERATION OF THE SWEEPSTAKES IS A VIOLATION OF CRIMINAL AND CIVIL LAWS AND SHOULD SUCH AN ATTEMPT BE MADE; THE SPONSOR RESERVES THE RIGHT TO SEEK DAMAGES OR OTHER REMEDIES FROM ANY SUCH PERSON(S) RESPONSIBLE FOR THE ATTEMPT TO THE FULLEST EXTENT PERMITTED BY LAW.
                      <br /><br />
                      Failure by the Sponsor to enforce any provision of these Official Rules shall not constitute a waiver of that provision. In the event of a dispute as to the identity of a Winner based on an email address, the winning entry will be declared to have been made by the authorized account holder of the email address associated with the registration in question. "Authorized account holder" is defined as the natural person who is assigned to an email address by an Internet access provider, online service provider or other organization (e.g., business, educational, institution, etc.) that is responsible for assigning email addresses for the domain associated with the submitted email address.
                      <br /><br />
                      <b>RELEASE AND LIMITATIONS OF LIABILITY</b>: By participating in the Sweepstakes, Entrants agree to release and hold harmless the Released Parties from and against any claim or cause of action arising out of participation in the Sweepstakes or receipt or use of any Prize, including, but not limited to: (i) any technical errors that may prevent an Entrant from submitting an entry; (ii) unauthorized human intervention in the Sweepstakes; (iii) printing errors; (iv) errors in the administration of the Sweepstakes or the processing of entries; or (v) injury, death, or damage to persons or property which may be caused, directly or indirectly, in whole or in part, from Entrant’s participation in the Sweepstakes or receipt of the Prize. Released Parties assume no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of, entries. Released Parties are not responsible for any problems or technical malfunction of any telephone network or telephone lines, computer online systems, servers, or providers, computer equipment, software, failure of any email or entry to be received by Sponsor on account of technical problems, human error or traffic congestion on the Internet or at any Website, or any combination thereof, including any injury or damage to Entrant's or any other person's computer relating to or resulting from participation in this Sweepstakes or downloading any materials in this Sweepstakes. Entrants further agree that in any cause of action, the Released Parties’ liability will be limited to the cost of entering and participating in the Sweepstakes, and in no event shall the Released Parties be liable for attorney fees. Entrants waive the right to claim any damages whatsoever, including, but not limited to, punitive, consequential, direct, or indirect damages. <b>For New Jersey Residents: nothing herein bars recovery of damages or attorneys’ fees where mandated by statute.</b>
                      <br /><br />
                      Except as expressly provided above, IN NO EVENT WILL RELEASED PARTIES BE RESPONSIBLE OR LIABLE FOR ANY DAMAGES OR LOSSES OF ANY KIND (INCLUDING WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES) ARISING OUT OF PARTICIPATION IN THIS SWEEPSTAKES OR THE ACCEPTANCE, POSSESSION, USE, OR MISUSE OF, OR ANY HARM RESULTING FROM THE ACCEPTANCE, POSSESSION, USE OR MISUSE OF A PRIZE.
                      <br /><br />
                      By participating, Entrants release and agree to hold harmless the Released Parties from any and all liability for any injuries, death or losses or damages to persons or property AS WELL AS CLAIMS/ACTIONS BASED ON PUBLICITY RIGHTS, DEFAMATION, AND/OR INVASION OF PRIVACY that may arise from participating in this Sweepstakes or its related activities or the acceptance, possession, use or misuse of, or any harm resulting from the acceptance, possession, use or misuse of a Prize. Released Parties are not liable in the event that any portion of the Sweepstakes is cancelled due to weather, fire, strike, acts of war or terrorism, pandemic, or any other condition beyond their control.
                      <br /><br />
                      EACH ENTRANT UNDERSTANDS AND AGREES THAT ALL RIGHTS UNDER SECTION 1542 OF THE CIVIL CODE OF CALIFORNIA AND ANY SIMILAR LAW OF ANY STATE OR TERRITORY OF THE USA ARE HEREBY EXPRESSLY WAIVED BY HIM/HER.  SECTION 1542 READS AS FOLLOWS:
                      <br /><br />
                      “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS THAT THE CREDITOR OR RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE AND THAT, IF KNOWN BY HIM OR HER, WOULD HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY.”
                      <br /><br />
                      <b>PRIZE & PRIZE CONDITIONS</b>: There will be six thousand eight hundred and fourteen (6,814) Prizes available. The Prize Winner (“Winner”), upon the Sponsor’s confirmation of eligibility, will receive one (1) of the following Prizes:
                      <br /><br />
                      -One (1) ten percent (10%) off order coupon code to use on HI-CHEW’s website (Max 5,000 Winners)
                      <br />-One (1) fifteen percent (15%) off order coupon code to use on HI-CHEW’s website (Max 1,500 Winners)<br />
                      -One (1) twenty percent (20%) off order coupon code to use on HI-CHEW’s website (Max 250 Winners)<br />-One (1) free HI-CHEW Stand Up Pouch purchased via HI-CHEW’s website (Max 50 Winners)<br />
                      -One (1) free HI-CHEW Bucket Prize (Max 10 Winners)<br />-Two (2) free MLB tickets (Max 4 Winners): Tickets will be for the stadium they scanned at, on a mutually agreed upon date by both the winning party and HI-CHEW. HI-CHEW holds the right to refuse any dates at their discretion if the date is not feasible, no longer available, etc. In the case that someone wins a ticket and no regular season games remain, tickets will be arranged for the 2026 MLB regular season.<br /><br />
                      <br /><br />
                      The Approximate Retail Value (“ARV”) of the Prize package is between $1-$500 USD, which will vary depending upon Prize won. The value of the Prize set forth above represents Sponsor’s good faith determinations of the ARV thereof and such determinations are final and binding and cannot be appealed. If the actual value of a Prize is lower than the stated ARV when a Prize is procured and fulfilled, then the difference will not be awarded. All other expenses not specifically mentioned herein, including but not limited to, travel fees, ground transportation not specifically delineated, food, beverages, additional fees and gratuities, are the responsibility of the Winner and/or traveling companion. The Sponsor is not responsible for any cancellations, delays, diversions or substitutions or any act or omissions whatsoever by the MLB or any other persons providing any of these services and accommodations necessitated by same. The Sponsor shall not be liable for any loss or damage to personal property.
                      <br /><br />
                      The Winner is prohibited from selling, auctioning, trading or otherwise transferring any Prizes and the winner and guest(s) must abide by all MLB and venue rules and regulations.  All tickets, passes or related components for the MLB are issued subject to the applicable ticket terms and conditions available at the following websites:
  https://www.mlb.com/tickets/terms-and-conditions
                      <br /><br />
                      <b>PRIZE CONDITIONS</b>: By accepting the Prize, the Winner agrees to release and hold harmless the Released Parties from and against any claim or cause of action arising out of participation in the Sweepstakes or receipt or use of the Prize. The potential Winner(s) will be notified by home-delivered mail, phone, or email, and must sign and return to the Administrator, within three (3) days of the date of notice or attempted notice is sent, an Affidavit of Eligibility, Liability & Publicity Release in order to claim the Prize. Note: The Affidavit sent to a potential Winner will require that the Winner provide their Social Security Number to the Administrator, which will be used solely for tax reporting purposes. The Winner is responsible for all local, state, and federal taxes associated with the receipt of their Prize. The Winner must note that the value of the Prize is taxable as income and an IRS Form 1099 will be filed in the name of the Winner for the value of the Prize, and the Winner is solely responsible for all matters relating to the Prize after it is awarded. If a Prize or Prize notification is returned as unclaimed or undeliverable to a potential Winner, if a potential Winner cannot be reached or does not comply with prize redemption instructions within twenty-four (24) hours from the first notification attempt, or if a potential Winner fails to return requisite document(s) within the specified time period, or if a potential Winner is not in compliance with these Official Rules, then such person shall be disqualified and, at Sponsor’s sole discretion, an alternate Winner may be selected.
                      <br /><br />
                      By accepting the Prize, where permitted by law, the Winner grants to the Released Parties and those acting pursuant to the authority of Sponsor and the Released Parties (which grant will be confirmed in writing upon Sponsor’s request), the right to print, publish, broadcast and use worldwide IN ALL MEDIA without limitation at any time their full name, portrait, picture, voice, likeness and/or biographical information for advertising, trade and promotional purposes without further payment or additional consideration, and without review, approval or notification. The Winner also acknowledges that Released Parties have neither made nor are in any manner responsible or liable for any warranty, representation or guarantee, express or implied, in fact or in law, relative to the Prize.
                      <br /><br />
                      <b>DISPUTES</b>: All issues and questions concerning the construction, validity, interpretation and enforceability of these Official Rules or the rights and obligations of Entrants, Administrator, and Sponsor in connection with the Sweepstakes shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any choice of law or conflict of law rules or provisions that would cause the application of any other state’s or jurisdiction’s laws.  By participating in the Sweepstakes, Entrant agrees that: (i) any and all disputes, claims, and causes of action arising out of or in connection with the Sweepstakes, shall be resolved individually without resort to any form of class action; (ii) any judicial proceeding shall take place in a federal or state court within the State of California; (iii) any and all claims, judgments , and awards shall be limited to actual out-of pocket costs incurred, including costs associated with entering this Sweepstakes, but in no event will attorney fees be awarded or recoverable; (iv) under no circumstances will Entrant be permitted to obtain awards for, and Entrant hereby waives all rights to seek, punitive, incidental, exemplary, consequential, special damages, lost profits, other damages, and/or any rights to have damages multiplied or otherwise increased; and (v) Entrant’s remedies are limited to a claim for money damages (if any) and he/she waives any right to seek injunctive or equitable relief.
                      <br /><br />
                      <b>SEVERABILITY</b>: The invalidity or unenforceability of any provision of these Official Rules will not affect the validity or enforceability of any other provision. If any provision of the Official Rules is determined to be invalid or otherwise unenforceable, the other provisions will remain in effect and will be construed as if the invalid or unenforceable provision were not contained herein.
                      <br /><br />
                      <b>MISCELLANEOUS</b>: These Official Rules contain the full and complete understanding with respect to the Sweepstakes and supersede all prior and contemporaneous agreements, representations, and understandings, whether oral or written. The headings herein are for convenience only, do not constitute a part of these Official Rules, and shall not be deemed to limit or affect any of the provisions hereof. No amendment to, or waiver of, any provision of these Official Rules shall be effective unless in writing and signed by both Sponsor and Administrator. The waiver by Sponsor or Administrator of any provision of these Official Rules shall not constitute a waiver of any other provision herein. The rights and obligations hereunder may not be assigned by Entrants, whether by operation of law or otherwise, without the prior written consent of Sponsor, and any attempted assignment in violation of the foregoing shall be null and void. These Official Rules shall be binding upon, and inure to the benefit of, the permitted successors and assigns of Sponsor, Administrator, and Entrant.
                      <br /><br />
                      <b>WINNERS LIST REQUEST</b>: To request confirmation of the first name, last initial, city, and state of residence of the Winner, please send a self-addressed, stamped business-size envelope, by October 28, 2025 to: Morinaga America, Inc., 4 Park Plaza, Ste 750, Irvine, CA 92614
                      <br /><br />
                      This Sweepstakes is not sponsored, endorsed, or administered by Major League Baseball Properties, Inc.
                    </p>
                </div>
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
