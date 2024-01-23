import React, { useEffect, useState } from "react";
import '../css/navbar.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserGear ,faHouse, faMedal, faClipboardQuestion, faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo-small.png";
import AuthService from '../services/auth.service'

const Navigation = () => {
    const [currentUser, setCurrentUser] = useState({ is_admin: false, mail: "" });
    const [user, setUser] = useState(AuthService.getCurrentUser())

    useEffect(() => {
        const fetchData = async () => {
            try {
                // user.is_admin=true
                setCurrentUser(user);
                console.log(user);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchData();
    }, [user]);

    const logOut = () => {
        AuthService.logout();
    };
    return (
        <>
            <div className="nav">
                <input type="checkbox" id="nav-check" />
                <Link to="/">
                    <img className="nav-img" src={logo} alt="Logo" />
                </Link>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="nav-links">
                    <span className="user-mobile">
                        <FontAwesomeIcon icon={faCircleUser} size="2x" />
                        <b>Witaj {currentUser? currentUser.mail: "guest"}</b>
                        <Link to="/login">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </Link>
                    </span>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHouse} />
                        Strona główna
                    </Link>
                    <Link to="/score">
                        <FontAwesomeIcon icon={faMedal} />
                        Tablica wyników
                    </Link>
                    <Link to="/profile">
                        <FontAwesomeIcon icon={faUserGear} />
                        Profil
                    </Link>
                    {currentUser.is_admin ? (
                        <>
                            <Link to="/admin_quiz">
                                <FontAwesomeIcon icon={faClipboardQuestion} />
                                ADM qzzy
                            </Link>
                        </>
                    ) : null}
                    <span className="user">
                        Witaj {currentUser.mail}
                        <Link to="/login" onClick={logOut}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Navigation;