import Navigation from "./navigation";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminQuestionAdd from './admin-quiz-edit-add-question'
import QuizQuestionList from './admin_quiz_questions_list'
import authHeader from "../services/auth-header";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';

const AdminQuizEdit = () => {
    const { id } = useParams();
    const [quizzData, setQuizzData] = useState({
        name: "",
        description: "",
        img_url: "",
        is_active: false,
        tags: ""
    });
    const [quizQuestions, setQuizQuestions] = useState([]);

    // Stan do przechowywania trybu edycji
    const [editMode, setEditMode] = useState(false);

    const apiEndpoint = `http://localhost:3000/quizzes/${id}`
    const getQuizzData = () => {
        axios.get(apiEndpoint, { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                response.data.tags = response.data.tags.map(tag => tag.name).join(",");
                setQuizzData(response.data)
            })
            .catch(error => console.error('Błąd podczas pobierania danych quizzu', error));
    }
    const getQuestionsData = () => {
        axios.get(apiEndpoint + "/questions", { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setQuizQuestions(response.data)
            })
            .catch(error => console.error('Error fetching question data:', error));
    }

    useEffect(() => {
        getQuizzData()
        getQuestionsData()
    }, [apiEndpoint]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setQuizzData({
            ...quizzData,
            [name]: inputValue,
        });
    };

    // Funkcja obsługująca zapis zmienionych danych do backendu
    const handleSaveChanges = async (e) => {
        if (quizzData.tags) {
            quizzData.tags = quizzData.tags.trim().split(",").map((tag) => ({ name: tag }));
        } else {
            quizzData.tags = []
        }
        axios.put(apiEndpoint, quizzData, { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                toast("Zmodyfikowano poprawnie",{
                    theme: "success",
                })
                getQuizzData()
            })
            .catch(error => {
                console.error('Błąd podczas zmiany danych użytkownika', error)
                toast("Błąd podczas zmiany danych użytkownika",{
                    theme: "failure",
                })
            });
    };

    return (
        <>
            <Navigation></Navigation>
            <div className="wrapper">
                <div className="quiz-main">
                    <h1>Edytuj quiz <b>ID:{id}</b></h1>
                    {/* <div id="error">{message}</div> */}
                    <div id="editQuizzForm" className="basicform">
                        <label htmlFor="name">Nazwa</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Quiz o Fokach"
                            value={quizzData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="description">Opis</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Opis..."
                            value={quizzData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <label htmlFor="tags">Tagi</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="programowanie"
                            value={quizzData.tags}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="img_url">Url okładki</label>
                        <input
                            type="text"
                            id="img_url"
                            name="img_url"
                            placeholder="https://fajnyobraz.pl/obraz2"
                            value={quizzData.img_url}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="is_active">Aktywny</label>
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            checked={quizzData.is_active}
                            onChange={handleInputChange}
                        />
                        <button className="basic-button" onClick={() => handleSaveChanges(true)}>Aktualizuj</button>
                    </div>
                </div>
                <AdminQuestionAdd id={id} updateQuestions={getQuestionsData} />
                {quizQuestions.map((q) => (
                    <QuizQuestionList
                        key={q.id}
                        question={q}
                        id={id}
                        updateQuestions={getQuestionsData}
                    />
                ))}
            </div>
        </>
    );
};

export default AdminQuizEdit;