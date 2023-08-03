"use client"
import React, { useState } from 'react'
import useFetchData from '../useFetchData.js';

const page = () => {
    const [refetchCounter, setRefetchCounter] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    let { questions, loading, error} = useFetchData(refetchCounter);

    if (loading) return (<div className='container'><h1>Loading...</h1></div>)

    if (error) return (<div className='container'><h1>Error...</h1></div>)

    const { question, answers, correctAnswer } = questions[activeQuestion];

    const onAnswerSelected = (answer, idx) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        if (answer === correctAnswer) {
            setSelectedAnswer("true");
        } else {
            setSelectedAnswer("false");
        }
    }

    const onNextClick = () => {
        if (selectedAnswer === "true") {
            setResult((prev) => {
                return {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
            });
        } else {
            setResult((prev) => {
                return {
                    ...prev,
                    score: prev.score - 5,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
            });
        }
        if (activeQuestion < questions.length - 1) {
            setActiveQuestion(activeQuestion + 1);
            setChecked(false);
            setSelectedAnswerIndex(null);
        } else {
            setShowResult(true);
        }
    }
    const onRestartClick = () => {
        setRefetchCounter(prev => prev + 1)
        setActiveQuestion(0);
        setSelectedAnswer('');
        setChecked(false);
        setSelectedAnswerIndex(null);
        setShowResult(false);
        setResult({
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        });
    }

    return (<div className='container'>
        <h1>Quiz Page</h1>
        <div>
            <h2>
                Question: {activeQuestion + 1}
                <span>/ {questions.length}</span>
            </h2>
        </div>
        <div>
            {!showResult ?
                (<div className='quiz-container'>
                    <h3>{question}</h3>
                    {answers.map((answer, idx) => (
                        <li
                            key={idx}
                            className={selectedAnswerIndex === idx ? "li-selected" : "li-hover"}
                            onClick={() => onAnswerSelected(answer, idx)} >
                            <span>{answer}</span>
                        </li>))}
                    <button
                        className={checked ? "btn" : "btn-disabled"}
                        onClick={onNextClick}
                        disabled={!checked}>{questions.length - 1 > activeQuestion ? "Next" : "Finish"}
                    </button>
                </div>)
                :
                (<div className='quiz-container'>
                    <h3>Result</h3>
                    <h3>OverAll : %{(result.correctAnswers / questions.length) * 100} </h3>
                    <p>Score : {result.score}</p>
                    <p>Correct Answers: {result.correctAnswers}</p>
                    <p>Wrong Answers: {result.wrongAnswers}</p>
                    <button
                        className="btn"
                        onClick={onRestartClick}>
                        Restart
                    </button>
                </div>)}
        </div>
    </div>
    )
}
export default page;