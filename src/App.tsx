import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_services';
import { QuestionType } from './types/quiz_types';
import QuestionCard from './components/QuestionCard';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setcurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, 'easy');
      // console.log(questions);
      setQuiz(questions);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[currentStep];

    console.log("correct ans: " + currentQuestion.correct_answer + "  user ans: " + userAns)
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentStep !== quiz.length - 1)
      setcurrentStep(++currentStep);
    else {
      // alert("Your final Score is: " + score + " out of: " + quiz.length);
      // setcurrentStep(0);
      // setScore(0);
      setShowResult(true);
    }
  }

  if (!quiz.length)
    return <h3>Loading....</h3>

  if (showResult) {
    return (<div className="question-container result-container">
      <h1>Quiz App by Naeem</h1>
      <h2 >Result</h2>
      <p className="result-text">
        Your final Score is:
        <b> {score}</b> out of: <b> {quiz.length}</b>
      </p>
      <p>Want to restart the Quiz?</p>
      <button className="restart" onClick={() => {
        // setQuiz([]);
        // setcurrentStep(0);
        // setScore(0);
        // setShowResult(false);
        window.location.reload(true);
        // <div className="App">
        //   <h1>Quiz App by Naeem</h1>
        //   <QuestionCard
        //     options={quiz[currentStep].option}
        //     question={quiz[currentStep].question}
        //     callBack={handleSubmit}
        //   />
        // </div>
      }}>Restart</button>


    </div>)
  }

  return (
    <div className="App">
      <h1>Quiz App by Naeem</h1>
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callBack={handleSubmit}
      />
    </div>
  );
}

export default App;
