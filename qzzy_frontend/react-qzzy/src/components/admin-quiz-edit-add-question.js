
import React, { useState } from "react"
import axios from 'axios';
import "../css/quiz.css"

const AdminQuestionAdd = ({ id, updateQuestions }) => {
    const [questionData, setQuestionData] = useState({
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: ""
    });
    const apiEndpoint = `http://localhost:3000/quizzes/${id}/questions`
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'text') {
            setQuestionData({
                ...questionData,
                [name]: value,
            });
        } else if (type === 'radio') {
            setQuestionData({
                ...questionData,
                correct: value,
            });
        }
    };


    const handleSaveChanges = async (e) => {
        axios.post(apiEndpoint, questionData)
            .then(response => {
                console.log(response.data)
                setQuestionData({
                    question: "",
                    a: "",
                    b: "",
                    c: "",
                    d: "",
                    correct: ""
                });
                updateQuestions()
            })
            .catch(error => console.error('Błąd dodawania pytania', error));
    };

    return (
        <>
            <div className="quiz-main">
                <h2>Dodaj pytanie:</h2>
                {/* <div id="error">{message}</div> */}
                <div id="editQuizzQuestionForm" className="basicform">
                    <label htmlFor="question">Pytanie</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        placeholder="Pytanie...."
                        value={questionData.question}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="a">a</label>
                    <input
                        type="text"
                        id="a"
                        name="a"
                        placeholder="Odpowiedź a..."
                        value={questionData.a}
                        onChange={handleInputChange}
                        required
                    ></input>

                    <label htmlFor="b">b</label>
                    <input
                        type="text"
                        id="b"
                        name="b"
                        placeholder="Odpowiedź b..."
                        value={questionData.b}
                        onChange={handleInputChange}
                        required
                    ></input>
                    <label htmlFor="c">c</label>
                    <input
                        type="text"
                        id="c"
                        name="c"
                        placeholder="Odpowiedź c..."
                        value={questionData.c}
                        onChange={handleInputChange}
                        required
                    ></input>
                    <label htmlFor="d">d</label>
                    <input
                        type="text"
                        id="d"
                        name="d"
                        placeholder="Odpowiedź b..."
                        value={questionData.d}
                        onChange={handleInputChange}
                        required
                    ></input>
                    <hr></hr>
                    <p style={{ margin: "0" }}>Poprawna odpowiedź:</p>
                    <div className="quiz-questions-correct">
                        <input
                            type="radio"
                            id="radioA"
                            name="correct"
                            value="a"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="radioA">a</label>
                        <input
                            type="radio"
                            id="radioB"
                            name="correct"
                            value="b"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="radioB">b</label>
                        <input
                            type="radio"
                            id="radioC"
                            name="correct"
                            value="c"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="radioC">c</label>
                        <input
                            type="radio"
                            id="radioD"
                            name="correct"
                            value="d"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="radioD">d</label>
                    </div>
                </div>
                <button className="basic-button" onClick={() => handleSaveChanges(true)}>Dodaj</button>
            </div>
        </>
    );
};

export default AdminQuestionAdd;