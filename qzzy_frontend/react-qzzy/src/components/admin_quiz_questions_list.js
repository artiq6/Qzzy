import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const QuizQuestionList = ({ question, updateQuestions, id }) => {
    const [editMode, setEditMode] = useState(false)
    const [questionData, setQuestionData] = useState({
        question: question.question,
        a: question.a,
        b: question.b,
        c: question.c,
        d: question.d,
        correct: question.correct
    });
    const cancelChanges = () => {
        setQuestionData({
            question: question.question,
            a: question.a,
            b: question.b,
            c: question.c,
            d: question.d,
            correct: question.correct
        })
        setEditMode(!editMode)
    }
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        console.log(name, value, type)
        if (type === 'text' || type === 'select-one') {
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
    const apiEndpoint = `http://localhost:3000/quizzes/${id}/questions/${question.id}`

    const handleSaveChanges = async (e) => {
        console.log(apiEndpoint,questionData)
        axios.put(apiEndpoint, questionData)
            .then(response => {
                setEditMode(!editMode)
                console.log("put:",response.data)
                updateQuestions()
            })
            .catch(error => console.error('Błąd podczas edycji pytania', error));
    };
    const handleDelete = async (e) => {
        axios.delete(apiEndpoint)
            .then(response => {
                console.log(response.data)
                updateQuestions()
            })
            .catch(error => console.error('Błąd podczas usuwania pytania', error));
    };
    return (
        <div className="quiz-main">
            <div className="quiz-header">
                <h3>{`ID:${question.id} ${questionData.question}`}</h3>
            </div>
            {!editMode ? (
                <div className="quiz-questions">
                    <p><b>a: </b>{questionData.a}</p>
                    <p><b>b: </b>{questionData.b}</p>
                    <p><b>c: </b>{questionData.c}</p>
                    <p><b>d: </b>{questionData.d}</p>
                    <p><b>Poprawna odpowiedź: </b>{questionData.correct}</p>
                    <div className='button-group'>
                        <button className="basic-button" onClick={() => setEditMode(!editMode)}>Edytuj</button>
                        <button className="basic-button-warning" onClick={() => handleDelete()}>Usuń</button>
                    </div>
                </div>
            ) : (<>
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
                        placeholder="Odpowiedź d..."
                        value={questionData.d}
                        onChange={handleInputChange}
                        required
                    ></input>
                    <hr></hr>
                    <p style={{ margin: "0" }}>Poprawna odpowiedź:</p>
                    <select name="correct" value={questionData.correct} onChange={handleInputChange}>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                    </select>
                </div>
                <div className='button-group'>
                    <button className="basic-button" onClick={() => handleSaveChanges()}>Aktualizuj</button>
                    <button className="basic-button-warning" onClick={() => cancelChanges()}>Anuluj</button>
                </div>
            </>
            )}
        </div>
    );
};

export default QuizQuestionList;