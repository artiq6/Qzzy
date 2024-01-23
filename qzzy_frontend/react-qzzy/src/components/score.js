import Navigation from "./navigation";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Score = () => {


    const [topUsers, setTopUsers] = useState([]);
    const [topQuizzes, setTopQuizzes] = useState([]);

    const apiEndpoint = `http://localhost:3000/quizzes/scores`
    const getTopUsers = () => {
        axios.get(apiEndpoint + "/topuser")
            .then(response => {
                console.log(response.data)
                setTopUsers(response.data)
            })
            .catch(error => console.error('Błąd podczas pobierania danych o użytkownikach', error));
    }
    const getTopQuizzess = () => {
        axios.get(apiEndpoint + "/topquiz")
            .then(response => {
                console.log(response.data)
                setTopQuizzes(response.data)

            })
            .catch(error => console.error('Błąd podczas pobierania danych o quizach', error));
    }

    useEffect(() => {
        getTopUsers()
        getTopQuizzess()
    }, [apiEndpoint]);


    return (
        <>
            <Navigation></Navigation>
            <div class="wrapper">
                <h1>Najlepsi użytkownicy:</h1>
                <div class="table">
                    <div class="row header">
                        <div class="cell">
                            Login
                        </div>
                        <div class="cell">
                            Poprawne odpowiedzi
                        </div>
                        <div class="cell">
                            Wszystkie odpowiedzi
                        </div>
                        <div class="cell">
                            Wynik %
                        </div>
                    </div>
                    {topUsers.map(user => (
                        <div class="row">
                            <div class="cell">
                                {user.user_login}
                            </div>
                            <div class="cell">
                                {user.correct}
                            </div>
                            <div class="cell">
                                {user.all}
                            </div>
                            <div class="cell">
                                {user.percentage}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div class="wrapper">
                <h1>Najpopularniejsze Qzzy:</h1>
                <div class="table">
                    <div class="row header">
                        <div class="cell">
                            Nazwa
                        </div>
                        <div class="cell">
                            Liczba prób
                        </div>
                        <div class="cell">
                            % Poprawnych
                        </div>
                    </div>
                    {topQuizzes.map(quiz => (
                        <div class="row">
                            <div class="cell">
                                {quiz.quiz_name}
                            </div>
                            <div class="cell">
                                {quiz.frequency}
                            </div>
                            <div class="cell">
                                {parseFloat(quiz.average_percentage_correct).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Score;