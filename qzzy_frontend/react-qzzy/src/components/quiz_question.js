import React from 'react';

const QuizQuestion = ({ index, question, onAnswerChange }) => {
    const handleRadioChange = (event) => {
        onAnswerChange(event.target.value);
        console.log(event.target.value)
    };
    return (
        <div className="quiz-main">
            <div className="quiz-header">
                <h3>{`${index}. ${question.question}`}</h3>
            </div>
            <div className="quiz-questions">
                <input 
                type="radio" 
                id={`${question.id}`} 
                name={`${question.id}`} 
                value="a" 
                onChange={handleRadioChange}
                />
                <label htmlFor={`${question.id}`}>{question.a}</label>

                <input 
                type="radio" 
                id={`${question.id}b`} 
                name={`${question.id}`} 
                value="b" 
                onChange={handleRadioChange}
                />
                <label htmlFor={`${question.id}b`}>{question.b}</label>

                <input 
                type="radio" 
                id={`${question.id}c`} 
                name={`${question.id}`} 
                value="c"
                onChange={handleRadioChange}

                />
                <label htmlFor={`${question.id}c`}>{question.c}</label>

                <input 
                type="radio" 
                id={`${question.id}d`} 
                name={`${question.id}`} 
                value="d"
                onChange={handleRadioChange} 
                />
                <label htmlFor={`${question.id}d`}>{question.d}</label>
            </div>
        </div>
    );
};

export default QuizQuestion;