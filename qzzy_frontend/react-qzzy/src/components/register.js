import React, { useState } from 'react';
import '../css/style.css'; // Make sure to adjust the path based on your project structure
import logoImage from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        passwordcheck: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(formData.login.length<3){
            toast("Zbyt krótka nazwa użytkownika",{
                theme: "failure",
            })
            return;
        }
        if(!emailRegex.test(formData.email)){
            toast("Błędy format adresu email",{
                theme: "failure",
            })
            return;
        }
        if (formData.password.length<8) {
            toast("Hasło zbyt krótkie",{
                theme: "failure",
            })
            return;
        }
        if (formData.password !== formData.passwordcheck) {
            toast("Hasła nie są identyczne!",{
                theme: "failure",
            })
            return;
        }

        // Add your form submission logic here
        let { passwordcheck, ...registerData } = formData;
        console.log('Form submitted:', registerData);
        AuthService.register(formData.login, formData.email, formData.password).then(
            (response) => {
                console.log(response)
                toast("Rejestracja zakończona pomyślnie",{
                    theme: "success",
                    onClose:(event) => window.location.href = '/login',
                })
            },
            error => {
                toast(`Błąd po stronie serwera:${error}`,{
                    theme: "failure",
                })
            }
        );
    };

    return (
        <div style={{ height: '100vh', width: '100%', display: 'inline-block' }}>
            <div className="splitdiv" id="leftdiv">
                <div className="opacity">
                    <img src={logoImage} alt="qzzy" style={{ width: '70%' }} />
                </div>
            </div>

            <div className="splitdiv" id="rightdiv">
                <img src={logoImage} alt="qzzy" style={{ width: '50%', marginTop: '30px' }} className="mobileimg" />
                <div id="formcard">
                    <h1 style={{ textAlign: 'center' }}>Rejestracja</h1>
                    <p style={{ textAlign: 'center' }}>Wypełnij poniższy formularz w celu utworzenia nowego konta.</p>
                    <hr />
                    <form id="registerform" onSubmit={handleSubmit}>
                        <label htmlFor="login">Login</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            placeholder="quzzeusz"
                            value={formData.login}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="email">Adres email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="imie@domena.pl"
                            value={formData.email}
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
                        <label htmlFor="passwordcheck">Powtórz hasło</label>
                        <input
                            type="password"
                            id="passwordcheck"
                            name="passwordcheck"
                            value={formData.passwordcheck}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <input type="submit" value="Zarejestruj" id="registerbutton" />
                        <a href="/login">Masz już konto?</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;