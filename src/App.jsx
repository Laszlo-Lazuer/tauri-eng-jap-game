import React, { useState, useEffect } from 'react';
import './App.css';
import NameModal from './NameModal';

const questions = [
  { questionText: 'あ', answer: 'a' },
  { questionText: 'カ', answer: 'ka' },
  { questionText: 'す', answer: 'su' },
  { questionText: 'ネ', answer: 'ne' },
  { questionText: 'い', answer: 'i' },
  { questionText: 'ケ', answer: 'ke' },
  { questionText: 'せ', answer: 'se' },
  { questionText: 'ヌ', answer: 'nu' },
  { questionText: 'う', answer: 'u' },
  { questionText: 'コ', answer: 'ko' },
  { questionText: 'そ', answer: 'so' },
  { questionText: 'ナ', answer: 'na' },
  { questionText: 'え', answer: 'e' },
  { questionText: 'ク', answer: 'ku' },
  { questionText: 'た', answer: 'ta' },
  { questionText: 'ト', answer: 'to' },
  { questionText: 'お', answer: 'o' },
  { questionText: 'ツ', answer: 'tsu' },
  { questionText: 'か', answer: 'ka' },
  { questionText: 'ハ', answer: 'ha' }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answer, setAnswer] = useState('');
  const [pastScores, setPastScores] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);

  useEffect(() => {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setCurrentQuestion(0);

    const storedScores = localStorage.getItem('pastScores');
    if (storedScores) {
      setPastScores(JSON.parse(storedScores));
    }

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
      setLoading(false);
    } else {
      setLoading(false);
      setShowNameModal(true);
    }
  }, []);

  const handleNameSave = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setShowNameModal(false);
  };

  const handleAnswerSubmit = () => {
    if (answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswer('');
    } else {
      const initials = userName.slice(0, 3).toUpperCase();
      const timestamp = new Date().toLocaleString();
      const newPastScores = [...pastScores, { initials, score, timestamp }];
      setPastScores(newPastScores);
      localStorage.setItem('pastScores', JSON.stringify(newPastScores));
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setAnswer('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      {showNameModal && <NameModal onSave={handleNameSave} initialName={userName} />}
      <div className="header">
        <span>Welcome, {userName}</span>
        <button onClick={() => setShowNameModal(true)}>Change Initials</button>
      </div>
      {userName && (
        <>
          {showScore ? (
            <div>
              <div className="score-section">
                You scored {score} out of {questions.length}
              </div>
              <button onClick={resetQuiz}>Play Again</button>
              <div className="past-scores">
                <h3>Scoreboard</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Initials</th>
                      <th>Score</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastScores.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.initials}</td>
                        <td>{entry.score}</td>
                        <td>{entry.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">{questions[currentQuestion].questionText}</div>
              </div>
              <div className="answer-section">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the English word"
                />
                <button onClick={handleAnswerSubmit}>Submit</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;