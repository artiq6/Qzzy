import React, { useState } from 'react';
import '../css/style.css';
import AuthService from "../services/auth.service";
import logoImage from '../assets/Logo.png';
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';

const Login = () => {
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.mail)){
            toast("Błędy format adresu email",{
                theme: "failure",
            })
            return;
        }
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        AuthService.login(formData.mail, formData.password).then(
            x => {
                toast("Logowanie zakończona pomyślnie",{
                    duration: 2000,
                    theme: "success",
                    onClose:(event) => window.location.href = '/',
                })
            },
            error => {
                console.log(error)
                if(error.response.statusText==="Unauthorized"){
                    toast('Błędne hasło',{
                        theme: "failure",
                    })
                }else{
                    toast("Błąd",{
                        theme: "failure",
                    }) 
                }

            }
        );
    };

    return (
        <div style={{ height: '100vh', width: '100%', display: 'inline-block' }}>
            <div className="splitdiv" id="leftdiv">
                <div className="opacity">
                    <img src={logoImage} alt="qzzy" style={{ width: "70%" }} />
                </div>
            </div>
            <div className="splitdiv" id="rightdiv">
                <div id="formcard">
                    <img src={logoImage} alt="qzzy" style={{ width: '50%' }} className="mobileimg" />
                    <h1 style={{ textAlign: 'center' }}>Logowanie</h1>
                    <p style={{ textAlign: 'center' }}>Wpisz swoje dane logowania aby dostać się do Twojego konta.</p>
                    <hr />
                    <form id="loginform" onSubmit={handleSubmit}>
                        <label htmlFor="mail">Adres email</label>
                        <input
                            type="text"
                            id="mail"
                            name="mail"
                            placeholder="imie@domena.pl"
                            value={formData.mail}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <input type="submit" value="Zaloguj" id="loginbutton" />
                        <a href="/register">Nie masz jeszcze konta?</a>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;