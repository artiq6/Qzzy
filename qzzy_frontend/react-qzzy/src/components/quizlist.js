import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './navigation';
import "../css/home.css";
import authHeader from "../services/auth-header";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const apiUrl = 'http://localhost:3000/quizzes/active'; // Replace with your actual API endpoint

    useEffect(() => {
        axios.get(apiUrl, { headers: authHeader() })
            .then(response =>
                setQuizzes(response.data)
            )
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    return (
        <>
        <Navigation/>
        <div className="qzzy" id="root">
            {quizzes.map(quiz => (
                <div key={quiz.id} id={quiz.name} className="quiz">
                    <img src={quiz.img_url} className="cover-photo" alt="Quiz Cover" />
                    <div className="quizinfo">
                        <h2>{quiz.name}</h2>
                        <p className="tags">{quiz.tags.map(tag=>"#"+tag.name).join(", ")}</p>
                        <p className="description">{quiz.description}</p>
                        <a href={`quiz/${quiz.id}`} className="basic-button">
                            Start
                        </a>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};
export default QuizList;