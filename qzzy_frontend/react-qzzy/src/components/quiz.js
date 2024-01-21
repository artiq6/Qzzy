import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/quiz.css"
import QuizQuestion from './quiz_question';
import AuthService from '../services/auth.service'

const Quiz = () => {
    const [quizData, setQuizData] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizPoints, setQuizPoints] = useState("");

    const { id } = useParams();
    const apiUrl = `http://localhost:3000/quizzes/${id}`;

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setQuizData(response.data)
            })
            .catch(error => console.error('Error fetching quiz data:', error));
        axios.get(apiUrl + "/questions")
            .then(response => {
                setQuizQuestions(response.data)
            })
            .catch(error => console.error('Error fetching question data:', error));
    }, [apiUrl]);

    const [answers, setAnswers] = useState({});
    const [showBoard, setShowBoard] = useState(false)

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer,
        }));
    };
    const checkAnswers = () => {
        let poinstForQuiz = 0;
        let userPoints = 0;
        quizQuestions.forEach(q => {
            poinstForQuiz += 1
            if (q.correct === answers[q.id]) {
                console.log("poprawna")
                userPoints += 1
            } else {
                console.log("niepoprawna")
            }
        });
        setQuizPoints(userPoints+"/"+poinstForQuiz+" ("+(userPoints/poinstForQuiz*100).toFixed(0)+"%)")
        const user = AuthService.getCurrentUser()
        const scoreData={
            user_id: user.sub,
            quiz_id: parseInt(id),
            correct_answers: userPoints,
            all_answers: poinstForQuiz
        }
        axios.post(`http://localhost:3000/quizzes/scores/${id}`, scoreData)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error('Error fetching quiz data:', error));
    }
    const handleSubmit = () => {
        // console.log('Submitted Answers:', answers);
        checkAnswers()
        setShowBoard(true);
    };
    return (
        <div className="wrapper" id="quiz_game">
            {!showBoard && (
                <>
                    <h1>{quizData.name}</h1>
                    {quizQuestions.map((q, index) => (
                        <QuizQuestion
                            key={q.id}
                            index={index + 1}
                            question={q}
                            onAnswerChange={(answer) => handleAnswerChange(q.id, answer)}
                        />
                    ))}
                    <input type="submit" id="submit" onClick={handleSubmit}></input>
                </>
            )}
            <div className='quiz-main' style={{ display: showBoard ? 'flex' : 'none' }}>
                <h1>Gratulacje ukończyłeś Quizz!</h1>
                <h3>Twój wynik to {quizPoints}</h3>
                <a href="/" className="basic-button">Wróć do strony głównej</a>
            </div>
        </div>
    );
};

export default Quiz;