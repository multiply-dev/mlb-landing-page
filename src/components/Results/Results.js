import React from 'react';

import candyApple from '../../assets/candyApple.png';
import keyLime from '../../assets/keyLime.png';
import strawberry from '../../assets/strawberry.png';
import candyApplePillow from '../../assets/candy-apple-pillow.png';
import keyLimePillow from '../../assets/key-lime-pillow.png';
import strawberryPillow from '../../assets/strawberry-pillow.png';

import './Results.css'

const mostCommon = arr => {
  const count = [0, 1, 2].map(num => ({
    value: num,
    count: arr.filter(v => v === num).length
  }));

  count.sort((a, b) => b.count - a.count || a.value - b.value);

  return count[0].value;
};

const Results = ({ answers }) => {
  const score = mostCommon(answers)

  let description;
  let flavor;
  let flavorImage;
  let pillowImage;
  let personalityTraits;

  switch (score) {
    case 0:
      description = "You love classic, creamy desserts that are comforting and familiar."
      flavor = "Strawberry Ice Cream"
      flavorImage = strawberry;
      pillowImage = strawberryPillow;
      personalityTraits = [
        {
          trait: "Classic",
          desc: "You appreciate the timeless and comforting things in life."
        },
        {
          trait: "Sweet",
          desc: "Your kind and gentle nature makes you a beloved friend and family member."
        },
        {
          trait: "Nostalgic",
          desc: "You enjoy the simple pleasures and have a fondness for cherished memories and traditions."
        }
      ];
      break;
    case 1:
      description = "You enjoy desserts that are refreshing, tangy, and offer a little zing."
      flavor = "Key Lime Pie"
      flavorImage = keyLime;
      pillowImage = keyLimePillow;
      personalityTraits = [
        {
          trait: "Refreshing",
          desc: "You bring a burst of energy and enthusiasm to any situation."
        },
        {
          trait: "Zesty",
          desc: "Your vibrant personality adds a spark to every room you enter."
        },
        {
          trait: "Balanced",
          desc: "You appreciate a perfect balance of flavors, just like the sweet and tangy combination of Key Lime Pie."
        }
      ];
      break;
    case 2:
      description = "You’re fun, adventurous, and love desserts that are both sweet and exciting."
      flavor = "Candy Apple"
      flavorImage = candyApple;
      pillowImage = candyApplePillow;
      personalityTraits = [
        {
          trait: "Fun",
          desc: "You have a playful spirit and love to enjoy life to the fullest."
        },
        {
          trait: "Adventurous",
          desc: "You’re always looking for new and exciting experiences."
        },
        {
          trait: "Bold",
          desc: "You’re not afraid to stand out and be different, just like the vibrant and unique flavor of Candy Apple."
        }
      ];
      break;
    default:
      description = "You love classic, creamy desserts that are comforting and familiar."
      flavor = "Strawberry Ice Cream"
      flavorImage = strawberry;
      pillowImage = strawberryPillow;
      personalityTraits = [
        {
          trait: "Classic",
          desc: "You appreciate the timeless and comforting things in life."
        },
        {
          trait: "Sweet",
          desc: "Your kind and gentle nature makes you a beloved friend and family member."
        },
        {
          trait: "Nostalgic",
          desc: "You enjoy the simple pleasures and have a fondness for cherished memories and traditions."
        }
      ];
  }

  return (
    <div className="results-container">
      <div className="description-container">
        <div className="flavor-container">
          <h1 className="flavor-text">
            <span className="perfect-text">Your perfect<br></br> flavor is</span>
            <br></br> 
            {flavor}!
          </h1>
          <p>{description}</p>
        </div>
      </div>
      {/* <img src={flavorImage} alt="Flavor Image" className="flavor-image" /> */}
      <img src={pillowImage} alt="Pillow Image" className="pillow-image" />
      <div className="personality-container">
        <h2 className="personality-text">Personality Traits:</h2>
        {personalityTraits.map((trait, index) => (          
          <div className={`trait-container trait-${index}`} key={index}>
            <h4 className={`trait-name trait-name-${index}`}>{trait.trait}</h4>
            <p class="trait-desc">{trait.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;