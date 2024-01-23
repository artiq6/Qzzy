import React, { useState, useEffect } from 'react';
import Navigation from "./navigation"
import { Link } from "react-router-dom";
import "../css/table.css"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import authHeader from "../services/auth-header";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';

const AdminQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({
        id: null,
        name: '',
        description: '',
        tags: '',
        img_url: '',
        is_active: false,
    });

    const apiUrl = `http://localhost:3000/quizzes`;
    const getQuizes = () => {
        axios.get(apiUrl, { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setQuizzes(response.data)
            })
            .catch(error => {
                console.error('Error fetching quiz data:', error)
            });
    }
    useEffect(() => {
        getQuizes()
    }, [apiUrl]);

    const handleFormSubmit = (e) => {
        if (newQuiz.tags) {
            newQuiz.tags = newQuiz.tags.trim().split(",").map((tag) => ({ name: tag }));
        }else{
            newQuiz.tags=[]
        }

        e.preventDefault();
        axios.post('http://localhost:3000/quizzes/add', newQuiz, { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setNewQuiz({
                    id: null,
                    name: '',
                    description: '',
                    tags: '',
                    img_url: '',
                    is_active: false,
                })
                toast("Quiz dodany prawidłowo",{
                    theme: "success",
                })
                getQuizes()
            })
            .catch(error => {
                console.error('Błąd pobierania danych o quizie', error)
                toast("Błąd pobierania danych o quizie",{
                    theme: "failure",
                })
            });
    };

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setNewQuiz({
            ...newQuiz,
            [name]: inputValue,
        });
    };

    const handleDeleteButton = (id) => {
        console.log("DELETING:", id)
        axios.delete(`http://localhost:3000/quizzes/${id}`, { headers: authHeader() })
            .then(response => {
                console.log(response.status)
                toast("Usunięto",{
                    theme: "success",
                })
                getQuizes()
            })
            .catch(error => {
                console.error('Błąd usuwania quizu', error)
                toast("Błąd usuwania quizu",{
                    theme: "failure",
                })
            });
    }

    return (
        <>
            <Navigation></Navigation>
            <div className="wrapper">
                <h1>Dodaj nowy quiz</h1>
                <form id="loginform" onSubmit={handleFormSubmit}>
                    <label htmlFor="name">Nazwa</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Quiz o Fokach"
                        value={newQuiz.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="description">Opis</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Opis..."
                        value={newQuiz.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <label htmlFor="tags">Tagi</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder="programowanie"
                        value={newQuiz.tags}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="img_url">Url okładki</label>
                    <input
                        type="text"
                        id="img_url"
                        name="img_url"
                        placeholder="https://fajnyobraz.pl/obraz2"
                        value={newQuiz.img_url}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="is_active">Aktywny</label>
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={newQuiz.is_active}
                        onChange={handleInputChange}
                    />
                    <input type="submit" value="Dodaj" id="add" />
                </form>


                <h1>Lista quizów:</h1>
                <div className="table">
                    <div className="row header">
                        <div className="cell">
                            Id
                        </div>
                        <div className="cell">
                            Nazwa
                        </div>
                        <div className="cell">
                            Opis
                        </div>
                        <div className="cell">
                            Ilość tagów
                        </div>
                        <div className="cell">
                            Utworzono
                        </div>
                        <div className="cell">
                            Czy aktywny
                        </div>
                        <div className="cell">
                            Miniaturka
                        </div>
                        <div className="cell">
                            Akcje
                        </div>
                    </div>
                    {quizzes.map((quiz) => (
                        <div className="row" key={quiz.id}>
                            <div className="cell">
                                {quiz.id}
                            </div>
                            <div className="cell">
                                {quiz.name}
                            </div>
                            <div className="cell">
                                {quiz.description}
                            </div>
                            <div className="cell">
                                {quiz.tags.length}
                            </div>
                            <div className="cell">
                                {quiz.created_at}
                            </div>
                            <div className="cell">
                                {quiz.is_active ? "tak" : "nie"}
                            </div>
                            <div className="cell">
                                <img src={quiz.img_url} style={{ maxWidth: "50px" }} />
                            </div>
                            <div className="cell">
                                <Link to={`/admin_quiz_edit/${quiz.id}`}>
                                    <FontAwesomeIcon icon={faPen} />
                                </Link>
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#FF7171" }} onClick={() => handleDeleteButton(quiz.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default AdminQuiz;