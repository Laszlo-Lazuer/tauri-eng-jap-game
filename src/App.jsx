import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    questionText: 'What is the Hiragana for "a"?',
    answerOptions: [
      { answerText: 'あ', isCorrect: true },
      { answerText: 'い', isCorrect: false },
      { answerText: 'う', isCorrect: false },
      { answerText: 'え', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the Katakana for "ka"?',
    answerOptions: [
      { answerText: 'カ', isCorrect: true },
      { answerText: 'キ', isCorrect: false },
      { answerText: 'ク', isCorrect: false },
      { answerText: 'ケ', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the Hiragana for "su"?',
    answerOptions: [
      { answerText: 'す', isCorrect: true },
      { answerText: 'せ', isCorrect: false },
      { answerText: 'さ', isCorrect: false },
      { answerText: 'そ', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the Katakana for "ne"?',
    answerOptions: [
      { answerText: 'ネ', isCorrect: true },
      { answerText: 'ヌ', isCorrect: false },
      { answerText: 'ナ', isCorrect: false },
      { answerText: 'ニ', isCorrect: false },
    ],
  },
  // Add more questions as needed
];

// Fisher-Yates (Knuth) Shuffle Algorithm
const shuffleArray = (array) => {
  let shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const shuffled = questions.map((q) => ({
      ...q,
      answerOptions: shuffleArray(q.answerOptions),
    }));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {shuffledQuestions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{shuffledQuestions.length}
            </div>
            <div className="question-text">{shuffledQuestions[currentQuestion].questionText}</div>
          </div>
          <div className="answer-section">
            {shuffledQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;