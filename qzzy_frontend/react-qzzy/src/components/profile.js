import AuthService from "../services/auth.service";
import Navigation from "./navigation";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';

const Profile = () => {

    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.sub)

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        phone: ''
    });

    const [editMode, setEditMode] = useState(false);
    const apiEndpoint = `http://localhost:3000/users/${currentUser.sub}`
    const getUserData = () => {
        axios.get(apiEndpoint)
            .then(response => {
                console.log(response.data)
                if(response.data.userData){
                    setUserData(response.data.userData)
                }
            })
            .catch(error => console.error('Błąd podczas pobierania danych użytkownika', error));
    }

    useEffect(() => {
        getUserData()
    }, [apiEndpoint]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        axios.post(apiEndpoint, userData)
            .then(response => {
                console.log(response.data)
                toast('Dane zostały zmienione',{
                    theme: "success",
                })
                setEditMode(false)

            })
            .catch(error => {
                toast('Błąd podczas zmiany danych użytkownika',{
                    theme: "failure",
                })
            });

    };

    return (
        <>
            <Navigation></Navigation>
            <div className="quiz-main wrapper">
                <h1>Profil</h1>
                <h3>{currentUser.mail}</h3>
                <h3>{currentUser.access_token.substr(currentUser.access_token.length - 20)}</h3>
                {editMode ? (
                    <div id="editUserForm" class="editForm">
                        <label htmlFor="name">Imię</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Artur"
                            value={userData.name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <label htmlFor="surname">Nazwisko</label>
                        <input
                            type="surname"
                            id="surname"
                            name="surname"
                            placeholder="Paluch"
                            value={userData.surname}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <label htmlFor="phone">Numer telefonu</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="123 456 789"
                            value={userData.phone}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <div>
                            <button className="basic-button" style={{ margin: "5px" }} onClick={() => handleSaveChanges()}>Zapisz</button>
                            <button className="basic-button-warning" onClick={() => {
                                setEditMode(false)
                                getUserData()
                            }}>Anuluj</button>
                        </div>
                    </div>
                ) : (<>
                    <div>
                        <p><b>Imię:</b> {userData.name}</p>
                        <p><b>Nazwisko:</b> {userData.surname}</p>
                        <p><b>Numer telefonu:</b> {userData.phone}</p>
                    </div>
                    <button className="basic-button" onClick={() => setEditMode(true)}>Edytuj dane</button>
                </>
                )}
            </div>
        </>
    );
};

export default Profile;