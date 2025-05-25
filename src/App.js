import React, { useState } from 'react';
import ChewCrew from './components/ChewCrew/ChewCrew';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Question from './components/Question/Question';
import Results from './components/Results/Results';

import './App.css';

const questions = [
  { id: 1, 
    question: "What's your go-to dessert topping?", 
    choices: ['Fresh berries', 'Whipped cream', 'Caramel drizzle'] 
  },
  { id: 2, 
    question: "How do you prefer your dessert to be served?", 
    choices: ['In a cone', 'On a plate', 'On a stick'] 
  },
  { id: 3, 
    question: "What's your favorite type of exercise?", 
    choices: ['Yoga or pilates', 'Hiking or exploring nature', 'Dancing or team sports'] 
  },
  { id: 4, 
    question: "What's your preferred dessert texture?", 
    choices: ['Creamy', 'Smooth and tangy', 'Crunchy and juicy'] 
  },
  { id: 5, 
    question: "What's your favorite time of day to enjoy a dessert?", 
    choices: ['After dinner', 'Mid-afternoon', 'Anytime, as a snack'] 
  },
  { id: 6, 
    question: "Which setting sounds most appealing for enjoying a dessert?", 
    choices: ['At the beach', 'At a picnic', 'At a fun fair or carnival'] 
  },
  { id: 7, 
    question: "How adventurous are you with trying new desserts?", 
    choices: ['I stick to my favorites', 'I like to try new things occasionally', "I’m always on the lookout for something new and exciting"] 
  },
  { id: 8, 
    question: "What’s your idea of a perfect evening?", 
    choices: ['Cozy night in with a movie', 'Discovering a new restaurant', 'Going to a concert or a party'] 
  },
  { id: 9, 
    question: "What's your favorite dessert-related holiday?", 
    choices: ["Valentine's Day", 'Fourth of July', 'Halloween'] 
  },
  { id: 10, 
    question: "What’s your favorite way to celebrate a special occasion?", 
    choices: ['With a homemade dessert', 'With a fancy, tangy treat', 'With a fun, themed dessert'] 
  },
  { id: 11, 
    question: "How would your friends describe you?", 
    choices: ['Kind and dependable', 'Adventurous and spontaneous', 'Fun-loving and outgoing'] 
  },
  { id: 12, 
    question: "What's your ideal dessert portion size?", 
    choices: ['The bigger the better', 'One slice will do', 'A quick treat for on-the-go'] 
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleAnswer = (choice) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = choice;
    setAnswers(newAnswers);
    setCurrentQuestion(currentQuestion+1);
  };

  const handleSignupComplete = () => {
    setIsSignedUp(true);
  };

  return (
    <div className="container">
      <Header />
      {currentQuestion < questions.length ? (
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      )
       : !isSignedUp ? (
        <ChewCrew onSignupComplete={handleSignupComplete} />
      ) 
      : (
        <Results answers={answers} />
      )}
      <Footer />
    </div>
  );
};

export default App;