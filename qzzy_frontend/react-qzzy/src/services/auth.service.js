import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:3000/auth/";


const login = (mail, password) => {
    return axios
        .post(API_URL + "login", {
            mail,
            password
        })
        .then(response => {

            if (response.data.access_token) {
                const userObj = {
                    ...jwtDecode(response.data.access_token),
                    ...response.data,
                };
                console.log(userObj)
                localStorage.setItem("user", JSON.stringify(userObj));
            }

            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem("user");
}

const register = (login, mail, password) => {
    return axios.post(API_URL + "register", {
        login: login,
        mail: mail,
        password: password,
    });
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService